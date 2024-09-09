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
    const url = 'http://27.148.201.109:5700//open/auth/token';
    const params = new URLSearchParams({
        client_id: 'admin',
        client_secret: 'Kaopuyun@2024'
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            method: 'GET'
        });
        const data = await response.json();
        const getTk = data.data.token;
        console.log(getTk);
        // await delates(getTk);
    } catch (error) {
        console.log("Error fetching token:", error);
    }
}

// 更新变量
async function delates(token) {
    const url = 'http://27.148.201.109:5700/open/envs';
    const headers = {
        'Authorization': `Bearer ${token}`  // token为青龙token
    };

    try {
        const resp = await axios.get(url, { headers });  // 获取所有变量
        const panduan = resp.data.data;

        // 删除变量
        for (const item of panduan) {
            if (item.remarks === 'headers_x') {
                const deleteUrl = 'http://27.148.201.109:5700/open/envs';
                const id = [item.id];

                const deleteResp = await axios.delete(deleteUrl, {
                    headers,
                    data: id  // 删除变量 id为ck的id值
                });
                console.log(deleteResp.data);
                await update(token);
            }
        }
    } catch (error) {
        console.log("Error deleting variable:", error);
    }
}

// 更新变量
async function update(token) {
    const url = 'http://27.148.201.109:5700/open/envs';  // 青龙地址
    const data = [{
        name: 'headers_x',  // 变量名
        value: headers,     // 变量值
        remarks: new Date().toISOString()   // 备注
    }];
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const resp = await axios.post(url, data, { headers });  // 添加变量
        console.log(resp.data);
    } catch (error) {
        console.error("Error updating variable:", error);
    }
}
