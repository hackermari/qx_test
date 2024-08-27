// activityGet.js 在获取到活动code的时候可以提前通过控制状态实现提前进入活动页面
let body = $response.body;
let obj;

if(body && body !== undefined){
    try {
        let obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 修改 consumeCycleStore 的值
        if (obj && obj.data) {
            obj.data.onAgingTime = true;
            
            // 打印修改后的返回值到日志
            console.log(JSON.stringify(obj));
            
            body = JSON.stringify(obj);
        } else {
            console.log("No taskReachMsgList found in the response.");
        }
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    
}

$done({body});
