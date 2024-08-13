// getActCycleInfo.js
let body = $response.body;
let obj;

if(body && body !== undefined){
    try {
        obj = JSON.parse(body);
    
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
    
        // 找到最接近当前日期的 beginTime
        if (obj && obj.data && obj.data.actCycleDetails && obj.data.actCycleDetails.length > 0) {
            let closestCycle = obj.data.actCycleDetails.reduce((closest, cycle) => {
                let cycleDate = new Date(cycle.beginTime);
                return (cycleDate >= currentDate && (!closest || cycleDate < new Date(closest.beginTime))) ? cycle : closest;
            }, null);
    
            if (closestCycle) {
                obj.data.serverTime = closestCycle.beginTime;
    
                // 打印修改后的返回值到日志
                console.log("Modified Response: ", JSON.stringify(obj));
    
                body = JSON.stringify(obj);
            } else {
                console.log("No upcoming actCycleDetails found.");
            }
        } catch (e) {
            console.log(e.message);
        }
}else{
    console.log(body);
}

$done({body});
