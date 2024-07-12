import Taro from "@tarojs/taro";

// tabBar PATH
const TABBARPATH = [
  "/pages/home/index",
  "/pages/tools/index"
];


//删除对象的 null undefined 属性
const formatparams = (data) => {
  return Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
};
const urlStringify = (url, payload, encode = true) => {
  const arr = Object.keys(payload).map(
    (key) =>
      `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  );

  // NOTE 注意支付宝小程序跳转链接如果没有参数，就不要带上 ?，否则可能无法跳转
  let k = url.includes("?") ? "&" : "?";
  return arr.length ? `${url}${k}${arr.join("&")}` : url;
};

/**
 *
 * @param 跳转页面
 * @returns
 */
const linkTo = (options) => {
  let {
    key,
    url,
    title = "",
    params = {},
    isCheck = true, // 检查权限
    method = "navigateTo", // reLaunch: 关闭所有页面，打开到应用内的某个页面  redirectTo
  } = options;
  let type = method;
  params = formatparams(params);
  if (!url) return true;

  // 判断 是否 tabBar 页面
  const hasTabBar = TABBARPATH.find((path) => url === path);
  if (!!hasTabBar) type = "switchTab";

  // 是否带参数
  if (params && !hasTabBar) {
    url = urlStringify(url, params);
  }
  // 执行跳转
  Taro[type]({ url });
};

/**
 * 简易Toast
 * @param {*} msg
 */
const toast = (msg, duration = 2000) => {
  Taro.showToast({
    title: msg,
    duration: duration,
    icon: "none",
    mask: true,
  });
};

export { linkTo, toast };
