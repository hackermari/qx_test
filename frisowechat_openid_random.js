// 随机生成 openid
function randomOpenid(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < length; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
}

let url = $request.url;

// 正则：匹配 openid=xxxx
url = url.replace(/openid=[^&]*/i, "openid=" + randomOpenid(28));

// 输出修改后的 URL
$done({ url: url });
