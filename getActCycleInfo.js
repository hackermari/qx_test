// getActCycleInfo.js
let body = $response.body;
let obj;

if(body && body !== undefined){
    try {
        obj = JSON.parse(body);
    
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));

        // 获取当前日期
        let currentDate = new Date().getTime();

        // 初始化最近的 beginTime
        let closestBeginTime = null;
        
        // 找到最接近当前日期的 beginTime
        // 遍历 actCycleDetails，找到最近的 beginTime
        if (obj && obj.data && obj.data.actCycleDetails) {
            for (let cycle of obj.data.actCycleDetails) {
                let cycleBeginTime = new Date(cycle.beginTime).getTime();
                if (cycleBeginTime >= currentDate && (!closestBeginTime || cycleBeginTime < closestBeginTime)) {
                    closestBeginTime = cycle.beginTime;
                }
            }
            // 修改 serverTime 为找到的最近的 beginTime
            if (closestBeginTime) {
                obj.data.serverTime = closestBeginTime;
            }
            // 打印修改后的返回值到日志
            console.log(JSON.stringify(obj));
        }
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
