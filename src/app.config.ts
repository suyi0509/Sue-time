export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/tools/index',
    'pages/fullScreen/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: "#A4A4A6",
    selectedColor: "#d4237a",
    backgroundColor: "#272831",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./assets/images/home.png",
        selectedIconPath: "./assets/images/home-active.png",
      },
      {
        pagePath: "pages/tools/index",
        text: "工具库",
        iconPath: "./assets/images/tools.png",
        selectedIconPath: "./assets/images/tools-active.png",
      }
    ]
  },

})
