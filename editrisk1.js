// api-gw-toc.js
let body = $response.body;
let obj;
if(body && body !== undefined){
    
    try {
        let obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 修改 data 字段的值为新的日期时间
        if (obj && obj !== undefined) {
            obj.data = {
                "activityId": "1660642112787451905",
                "activityRecord": "曙光打卡礼-新_2023-09",
                "applyCount": "0",
                "realJoinCount": "0",
                "onceLimit": false,
                "payChance": 1,
                "chanceBalance": 1,
                "hadTotalChances": 1,
                "taskReachMsgs": []
            };
            // 打印修改后的返回值到日志
            console.log(JSON.stringify(obj));
            
            body = JSON.stringify(obj);
        } else {
            console.log("No data field found in the response.");
        }
    } catch (e) {
        console.log(e.message);
    }
}else{
    console.log(body);
    
}
$done({body});
