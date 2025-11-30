/*
增强版 Quantumult X 脚本
GetCustomer：
  - 替换 openid（URL参数）
  - 替换 Authorization
AddCustomer：
  - 替换 body.openid
  - 替换 Authorization
  - 打印最终 headers

新增：
  - openid 基于原始openid 并按10分钟生成稳定混合openid
*/

// 生成稳定 openid（10分钟不变）
function stableOpenid(original) {
    const timeSlot = Math.floor(Date.now() / 600000);
    const str = original + "-" + timeSlot;

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }

    const base = Math.abs(hash).toString(36).padEnd(24, "0");
    return "o" + base.substring(0, 27);
}

// Fake Token
function randomToken() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 64; i++) token += chars.charAt(Math.floor(Math.random() * chars.length));
    return "Bearer " + token;
}

let url = $request.url;
let headers = $request.headers;
let body = $request.body;

let isGetCustomer = url.includes("/GetCustomer");
let isAddCustomer = url.includes("/AddCustomer");

let newAuth = randomToken();

// 从 URL 中提取原始 openid
function getOriginalOpenidFromURL(url) {
    let match = url.match(/openid=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

// ------------------------
// GetCustomer
// ------------------------
if (isGetCustomer) {

    const original = getOriginalOpenidFromURL(url);
    const newOpenid = stableOpenid(original);

    url = url.replace(/openid=[^&]+/, `openid=${newOpenid}`);
    headers["Authorization"] = newAuth;

    console.log("=== GetCustomer Modified ===");
    console.log("URL:", url);
    console.log("Headers:", JSON.stringify(headers, null, 2));

    $done({ url, headers });
    return;
}

// ------------------------
// AddCustomer
// ------------------------
if (isAddCustomer) {

    // 修改 header Authorization
    headers["Authorization"] = newAuth;

    if (body) {
        try {
            if (body.startsWith("{")) {
                // JSON body
                let json = JSON.parse(body);
                const original = json.openid;
                json.openid = stableOpenid(original);
                body = JSON.stringify(json);
            }
        } catch (err) {
            console.log("Body parse error:", err);
        }
    }

    console.log("=== AddCustomer Modified ===");
    console.log("Headers:", JSON.stringify(headers, null, 2));
    console.log("Body:", body);

    $done({ headers, body });
    return;
}

$done({});
