// taskMsg.js
let body = $response.body;
let obj = JSON.parse(body);

// 修改 consumeCycleStore 的值
if (obj.data && obj.data.taskReachMsgList) {
    obj.data.taskReachMsgList.forEach(task => {
        task.consumeCycleStore = "0";  // 示例：将 consumeCycleStore 修改为 1000
    });
}

// 打印修改后的返回值到日志
console.log(JSON.stringify(obj));

body = JSON.stringify(obj);
$done({body});
