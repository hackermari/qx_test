// taskMsg.js
let body = $response.body;
let obj = JSON.parse(body);

// 打印原始返回值到日志
console.log("Original Response: ", JSON.stringify(obj));

// 在这里修改返回值，根据需要修改 obj 内容
// 例如，修改某个字段的值
if (obj.data) {
    obj.data.message = "Modified message content"; // 示例：修改 data.message 字段的值
}

// 打印修改后的返回值到日志
console.log("Modified Response: ", JSON.stringify(obj));

body = JSON.stringify(obj);
$done({body});
