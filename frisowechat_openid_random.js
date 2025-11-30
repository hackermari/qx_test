/*
Quantumult X 自定义请求处理脚本
功能：
- 拦截 GetCustomer & AddCustomer 请求
- 自动替换 openid（URL、body、headers）
- 自动替换 Authorization Bearer Token
- 打印最终 headers
*/

function randomOpenid() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "oSG6Nj";
    for (let i = 0; i < 20; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

function randomToken() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 64; i++) token += chars.charAt(Math.floor(Math.random() * chars.length));
    return "Bearer " + token;
}

let url = $request.url;
let method = $request.method;
let headers = $request.headers;
let body = $request.body;

let newOpenid = randomOpenid();
let newAuth = randomToken();

let isGetCustomer = url.includes("/GetCustomer");
let isAddCustomer = url.includes("/AddCustomer");

// ------------------------
// 处理 GetCustomer
// ------------------------
if (isGetCustomer) {
    // 替换 URL 参数 openid
    url = url.replace(/openid=[^&]+/, `openid=${newOpenid}`);

    // 替换 Authorization
    headers["Authorization"] = newAuth;

    console.log("=== GetCustomer Request Modified ===");
    console.log("URL:", url);
    console.log("Headers:", JSON.stringify(headers, null, 2));

    $done({ url, headers });
    return;
}

// ------------------------
// 处理 AddCustomer
// ------------------------
if (isAddCustomer) {
    // 修改 header Authorization
    headers["Authorization"] = newAuth;

    // 修改 body 中 openid
    if (body) {
        try {
            if (body.startsWith("{")) {
                // JSON
                let json = JSON.parse(body);
                json.openid = newOpenid;
                body = JSON.stringify(json);
            } else {
                // form-urlencoded
                body = body.replace(/openid=[^&]+/, `openid=${newOpenid}`);
            }
        } catch (e) {
            console.log("Body parse error:", e);
        }
    }

    console.log("=== AddCustomer Request Modified ===");
    console.log("Headers:", JSON.stringify(headers, null, 2));
    console.log("Body:", body);

    $done({ headers, body });
    return;
}

// 默认不处理
$done({});
