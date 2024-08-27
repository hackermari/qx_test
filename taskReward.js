// taskReward.js
let body = $response.body;
let obj;

if(body && body !== undefined){
    
    try {
        let obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 修改 code 字段为 999999，data 字段为 "error"
        if (obj) {
            obj.msg = "error";

            // 打印修改后的返回值到日志
            console.log(JSON.stringify(obj));

            // 更新 body 以反映修改后的数据
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
