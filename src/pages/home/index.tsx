import { View, Image, Text } from "@tarojs/components";
import { linkTo, toast } from "@/utils";
import { observer } from "mobx-react";
import store from "@/store";
import icon_menu1 from "@/assets/images/icon_menu1.png";
import icon_menu2 from "@/assets/images/icon_menu2.png";
import icon_menu3 from "@/assets/images/icon_menu3.png";
import home_top from "@/assets/images/home_top.png";
import Time from "../component/time";

import "./index.scss";

const menus = [
  {
    img: icon_menu2,
    text: "秒表",
    english: "Stop watch",
    url: "/pagesTime/stopwatch/index",
  },
  {
    img: icon_menu3,
    text: "专注番茄",
    english: "Focus on",
    url: "/pagesTime/focuson/index",
  },
];

const secondsToMinutesSeconds = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
};

const Home = () => {
  return (
    <View className="home">
      <View className="home_top">
        {store.getFocuson("state") === "run" && (
          <View className="fq_time">
            番茄倒计时ing：{secondsToMinutesSeconds(store.getFocuson("time"))}
          </View>
        )}
        <View
          className="home_top_city"
          onClick={() => toast("正在开发，敬请期待")}
        >
          <Text className="at-icon at-icon-map-pin"></Text>
          <Text>中国 , 北京</Text>
          <Text className="at-icon at-icon-chevron-right"></Text>
        </View>
        <Image src={home_top}></Image>
      </View>
      <View className="form-block-bg home_time">
        <Time />
      </View>
      <View className="home_menus">
        <View
          className="form-block-bg home_menus_left"
          onClick={() => {
            linkTo({
              url: "/pagesTime/countdown/index",
            });
          }}
        >
          <View className="menus_text">倒计时</View>
          <Image src={icon_menu1}></Image>
        </View>
        <View className="home_menus_right">
          {menus.map((item, index) => {
            return (
              <View
                key={index}
                className="form-block-bg right_item"
                onClick={() => {
                  linkTo({
                    url: item.url,
                  });
                }}
              >
                <View className="menus_text">
                  <View>{item.text}</View>
                  <View className="eng">{item.english}</View>
                </View>
                <Image src={item.img} mode="widthFix"></Image>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default observer(Home);
