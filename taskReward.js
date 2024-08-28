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

        // 设置每秒执行一次
        let interval = setInterval(executeTask, 10);
        
        // 如果需要在一定时间后停止执行，可以使用 clearInterval(interval);
        // 例如，3秒后停止执行：
        setTimeout(() => clearInterval(interval), 10000);
        
        // 由于 Quantumult X 脚本需要调用 $done() 完成执行，不能无限运行
        // 所以在脚本执行结束时调用 $done()
        setTimeout(() => $done(), 10000 + 100); // 3秒后结束脚本
        
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    $done();
}

function executeTask() {
    let timestamp = new Date().toISOString();
    console.log(timestamp);
    // $task.fetch(options).then(response => {
    //     console.log(response.statusCode);
    //     console.log(response.body);
    //     // $done();
    // }, reason => {
    //     console.log(reason.error);
    //     $done({body: reason.error});
    // });
    
}
