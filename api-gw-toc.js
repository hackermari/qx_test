// api-gw-toc.js
let body = $response.body;
let obj = JSON.parse(body);

// 在这里修改返回值，根据需要修改 obj 内容
obj.data = "modified data";  // 示例：修改返回数据中的 data 字段

// 打印原始和修改后的返回值到日志
console.log("Original Response: ", $response.body);
console.log("Modified Response: ", JSON.stringify(obj));

body = JSON.stringify(obj);
$done({body});
