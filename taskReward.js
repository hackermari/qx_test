// taskReward.js 屏蔽失败遮罩
let url = $request.url;
let method = $request.method;
let headers = $request.headers;
let body = $request.body;

if ((url && method !== "OPTIONS")) {
    try {
        console.log("请求 URL: " + url);
        console.log("请求 Method: " + method);
        console.log("请求 Headers: " + JSON.stringify(headers));
        console.log("请求 Body: " + body);

        getQinglongToken();
    } catch (e) {
        console.log("外部异常: " + e.message);
    }
} else {
    $done();
}

// ✅ fetchWithRetry 工具函数
async function fetchWithRetry(options, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await $task.fetch(options);
            return response;
        } catch (error) {
            console.log(`$task.fetch 重试 (${i + 1}/${retries}) 失败: ${error}`);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

// ✅ 获取青龙 token
async function getQinglongToken() {
    const tokenUrl = 'http://27.148.201.126:5800/open/auth/token';
    const tokenParams = new URLSearchParams({
        client_id: '_rk3h_o2x_EK',
        client_secret: 'ZE-KgDQ5Uwxsk4VRQ9iWsOON'
    }).toString();

    const options = {
        url: `${tokenUrl}?${tokenParams}`,
        method: 'GET'
    };

    try {
        const response = await fetchWithRetry(options);
        const data = JSON.parse(response.body);
        const token = data.data.token;
        console.log("获取 token 成功: " + token);
        delates(token);
    } catch (error) {
        console.log("获取 token 失败: " + error);
    }
}

// ✅ 删除 zeekr_headers_x 后再更新
async function delates(token) {
    const envsUrl = 'http://27.148.201.126:5800/open/envs';
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetchWithRetry({
            url: envsUrl,
            method: 'GET',
            headers: headers
        });

        const data = JSON.parse(response.body);
        const envList = data.data;

        for (const item of envList) {
            if (item.name === 'zeekr_headers_x') {
                const deleteOptions = {
                    url: envsUrl,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([item.id])
                };

                try {
                    const delRes = await fetchWithRetry(deleteOptions);
                    console.log("删除成功: " + delRes.body);
                    await update(token);
                } catch (delErr) {
                    console.log("删除失败: " + delErr);
                }
            }
        }
    } catch (error) {
        console.log("查询环境变量失败: " + error);
    }
}

// ✅ 添加 zeekr_headers_x
async function update(token) {
    const updateUrl = 'http://27.148.201.126:5800/open/envs';
    const timestamp = new Date().toISOString();

    const updateData = [{
        name: 'zeekr_headers_x',
        value: JSON.stringify(headers),
        remarks: `更新时间: ${timestamp}`
    }];

    const updateOptions = {
        url: updateUrl,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    };

    try {
        const response = await fetchWithRetry(updateOptions);
        console.log("更新成功: " + response.body);
    } catch (error) {
        console.log("更新失败: " + error);
    }
}
