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
                "verifyCode" : "1025339560940535808",
                "activityCode" : "ACT_STORE_SIGN",
                "intentionSeries" : "7440",
                "pathway" : "QR_CODE",
                "drawActivityId" : "1660642112787451905",
                "activityType" : 1,
                "activityId" : "XXT1684127854",
                "storeId" : "Z367",
                "identities" : "LAN1684131341",
                "sourceId" : "sourceyxhd",
                "ownPerson" : "1812534115622076416",
                "ownOrgan" : "2023",
                "needRailFlag" : "1",
                "validity" : "1440",
                "businessType" : "999999",
                "personIdType" : "ADMIN_ID",
                "personId" : "1812534115622076416",
                "createTime" : "2024-12-07 19:40:11",
                "expertFlag" : "0",
                "tourActFlag" : "0"
            },
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
