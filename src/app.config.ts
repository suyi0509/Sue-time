export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/home/setting/index',
    'pages/tools/index',
    'pages/fullScreen/index',
  ],
  window: {
    navigationBarBackgroundColor: "#18171D",
    navigationBarTitleText: "",
    navigationBarTextStyle: "white",
    backgroundColorTop: "#18171D",
    backgroundColorBottom: "#18171D",
    backgroundTextStyle: "light",
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
        iconPath: "./assets/tabs/home.png",
        selectedIconPath: "./assets/tabs/home-active.png",
      },
      {
        pagePath: "pages/tools/index",
        text: "工具库",
        iconPath: "./assets/tabs/tools.png",
        selectedIconPath: "./assets/tabs/tools-active.png",
      }
    ]
  },

})
