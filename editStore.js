// api-gw-toc.js
let body = $response.body;
let obj;
if(body && body !== undefined){
    
    try {
        let obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 修改 data 字段的值为新的日期时间
        if (obj && obj.data !== undefined) {
            obj.data = {"sourceId":"sourceyxhd","ownOrgan":"FZ11","activityId":"XXT1684127854","activityCode":"ACT_STORE_SIGN","identities":"LAN1684131341","personIdType":"ADMIN_ID","ownPerson":"1742099963829252096","tourActFlag":"0","personId":"1742099963829252096","storeId":"Z321","createTime":"2024-11-24 10:41:57","validity":"1440","businessType":"999999","needRailFlag":"1","activityType":1,"drawActivityId":"1660642112787451905","expertFlag":"0","intentionSeries":"7440","pathway":"QR_CODE"};
            
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
