// getActCycleInfo.js
let body = $response.body;
let obj;

if(body && body !== undefined){
    try {
        obj = JSON.parse(body);
    
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
    
        // 修改 serverTime 的值为 actCycleDetails 最后一个元素的 beginTime
        if (obj && obj.data && obj.data.actCycleDetails && obj.data.actCycleDetails.length > 0) {
            let lastCycle = obj.data.actCycleDetails[obj.data.actCycleDetails.length - 1];
            obj.data.serverTime = lastCycle.beginTime;
    
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
