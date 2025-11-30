/***********************************************
 * 最终版本（所有 GetCustomer 强制替换 openid+token）
 *
 * GetCustomer → 替换 openid & Authorization
 * AddCustomer → 替换 Authorization，仅此
 ***********************************************/

// ===== 工具函数 =====
function randomString(len) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let s = "";
    for (let i = 0; i < len; i++) {
        s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
}

// 微信风格 openid
function randomOpenId() {
    return "o" + randomString(27);
}

// base64url
function base64url(str) {
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// 生成合法结构 JWT
function generateFakeJWT() {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
        ExpireTime: Date.now() + 30 * 60 * 1000,
        RequestId: randomString(16)
    };

    const h = base64url(JSON.stringify(header));
    const p = base64url(JSON.stringify(payload));
    const s = randomString(43); // 随机 signature 即可

    return `${h}.${p}.${s}`;
}

// ===== 主逻辑 =====

let url = $request.url;
let headers = $request.headers;

// 处理 GetCustomer：始终替换 openid + token
if (url.includes("/api/activity/GetCustomer")) {

    // 若已有原始 openid，则替换之
    if (url.includes("openid=")) {
        url = url.replace(/openid=[^&]*/i, `openid=${randomOpenId()}`);
    } else {
        // 没有则追加
        url = url.includes("?")
            ? `${url}&openid=${randomOpenId()}`
            : `${url}?openid=${randomOpenId()}`;
    }

    headers["Authorization"] = "Bearer " + generateFakeJWT();

    $done({ url, headers });
    return;
}

// 处理 AddCustomer：只替换 token
if (url.includes("/api/activity/AddCustomer")) {
    headers["Authorization"] = "Bearer " + generateFakeJWT();
    $done({ url, headers });
    return;
}

// 默认放行
$done({});
