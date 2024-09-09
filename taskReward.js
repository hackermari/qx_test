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
        
        // 设置每秒执行一次
        let interval = setInterval(executeTask, 100);
        
        // 如果需要在一定时间后停止执行，可以使用 clearInterval(interval);
        // 例如，3秒后停止执行：
        setTimeout(() => clearInterval(interval), 3000);
        
        // 由于 Quantumult X 脚本需要调用 $done() 完成执行，不能无限运行
        // 所以在脚本执行结束时调用 $done()
        setTimeout(() => $done(), 3000 + 100); // 3秒后结束脚本
        
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    $done();
}

function executeTask() {
    let timestamp = new Date().toISOString();
    // console.log(timestamp);
    // $task.fetch(options).then(response => {
    //     console.log(response.statusCode);
    //     console.log(response.body);
    //     // $done();
    // }, reason => {
    //     console.log(reason.error);
    //     $done({body: reason.error});
    // });
    
}

// 获取青龙token
async function getQinglongToken() {
    const tokenUrl = 'http://27.148.201.109:5700/open/auth/token';
    const tokenParams = new URLSearchParams({
        client_id: 'Q-MyQ42n-iA9',
        client_secret: 'yzFl3-K-8O65kXmoht2TsbFa'
    });

    try {
        const response = await fetch(`${tokenUrl}?${tokenParams}`, {
            method: 'GET'
        });
        const data = await response.json();
        const getTk = data.data.token;
        console.log(getTk);
        await delates(getTk);
    } catch (error) {
        console.log(error);
    }
}

// 更新变量
async function delates(token) {
    const delates_url = 'http://27.148.201.109:5700/open/envs';
    const delates_headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(delates_url, {
            method: 'GET',
            headers: delates_headers
        });
        const data = await response.json();
        const panduan = data.data;

        // 删除变量
        for (const item of panduan) {
            if (item.name === 'zeekr_headers_x') {
                const delete_url = 'http://27.148.201.109:5700/open/envs';
                
                const delete_options = {
                    url: delete_url,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    // 将 id 包装成对象数组
                    body: JSON.stringify([{ id: Number(id) }])
                };

                $task.fetch(delete_options).then(response => {
                    //await update(token);
                    console.log(response.body);  // 输出返回的响应
                }).catch(error => {
                    console.log(`Error deleting variable: ${error}`);
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// 更新变量
async function update(token) {
    const update_url = 'http://27.148.201.109:5700/open/envs';  // 青龙地址
    const update_data = [{
        name: 'zeekr_headers_x',  // 变量名
        value: headers,     // 变量值
        remarks: new Date().toISOString()   // 备注
    }];
    const update_headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: update_headers,
            body: JSON.stringify(update_data)  // 添加变量
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
