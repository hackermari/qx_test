// api-gw-toc.js
let body = $response.body;
let obj = JSON.parse(body);

// 打印原始返回值到日志
console.log("1: ", JSON.stringify(obj));

// 修改 data 字段的值
obj.data = "2024-07-26 10:00:54";  // 你可以根据需要修改为其他值，例如新的时间戳

// 打印修改后的返回值到日志
console.log("2: ", JSON.stringify(obj));

body = JSON.stringify(obj);
$done({body});
