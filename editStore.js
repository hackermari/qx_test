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
              "code" : "000000",
              "data" : {
                "businessType" : "999999",
                "storeId" : "Z367",
                "tourActFlag" : "0",
                "activityCode" : "ACT_STORE_SIGN",
                "personId" : "1816187918083670016",
                "activityType" : 1,
                "ownOrgan" : "2023",
                "activityId" : "XXT1684127854",
                "sourceId" : "sourceyxhd",
                "personIdType" : "ADMIN_ID",
                "drawActivityId" : "1660642112787451905",
                "identities" : "LAN1684131341",
                "expertFlag" : "0",
                "createTime" : "2024-11-30 16:29:15",
                "ownPerson" : "1816187918083670016",
                "intentionSeries" : "8897",
                "pathway" : "QR_CODE",
                "validity" : 1440,
                "needRailFlag" : "1"
              },
              "msg" : "成功",
              "date" : "1732956122199"
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
