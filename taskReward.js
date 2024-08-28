// taskReward.js屏蔽失败遮罩
let url = $request.url;
let method = $request.method;
let headers = $request.headers;
let body = $request.body;

if(url && url !== undefined){
    
    try {
        console.log(url);
        console.log(method);
        console.log(JSON.stringify(headers));
        console.log(body);

        let targetUrl = url;
        let options = {
            url: targetUrl,
            method: method,
            headers: headers,
            body: body
        };
        $task.fetch(options).then(response => {
            console.log(response.statusCode);
            console.log(response.body);
            $done();
        }, reason => {
            console.log(reason.error);
            $done({body: reason.error});
        });
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    $done();
}
