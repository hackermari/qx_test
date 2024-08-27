// taskReward.js屏蔽失败遮罩
let body = $response.body;
let obj;

if(body && body !== undefined){
    
    try {
        obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 判断 success 是否为 false
        if (obj.success === false) {
            console.log("Response rejected due to success being false.");
            $done({ response: { status: 403, body: "Request Rejected" } }); // 直接拒绝请求
        } else {
            // 继续处理响应
            console.log("Response accepted.");
            $done({ body });
        }
        
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    $done({body});
}
