// api-gw-toc.js
let body = $response.body;
let obj;

if(body && body !== undefined){
    
    try {
        let obj = JSON.parse(body);
        
        // 打印原始返回值到日志
        console.log(JSON.stringify(obj));
        
        // 获取当前日期，并设置时间为10:00:00
        let currentDate = new Date();
        currentDate.setHours(10, 0, 0, 0);  // 设置时间为10:00:00
        
        // 格式化日期为 "YYYY-MM-DD HH:mm:ss"
        let formattedDate = currentDate.getFullYear() + '-' + 
            ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + 
            ('0' + currentDate.getDate()).slice(-2) + ' ' + 
            ('0' + currentDate.getHours()).slice(-2) + ':' + 
            ('0' + currentDate.getMinutes()).slice(-2) + ':' + 
            ('0' + currentDate.getSeconds()).slice(-2);
        
        // 修改 data 字段的值为新的日期时间
        if (obj && obj.data !== undefined) {
            obj.data = formattedDate;
            
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
