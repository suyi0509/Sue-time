import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image, CoverImage } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { linkTo } from "@/utils";
import menu1 from "@/assets/images/menu1.jpg";
import menu2 from "@/assets/images/menu2.jpg";
import menu3 from "@/assets/images/menu3.jpg";
import menu4 from "@/assets/images/menu4.jpg";
import bg from "@/assets/icon/top.png";
import dayjs from "dayjs";

import Time from "../component/time";

import "./index.scss";

const menus = [
  {
    img: menu2,
    text: "倒计时",
  },
  {
    img: menu3,
    text: "番茄计时",
  },
  {
    img: menu4,
    text: "工具库",
  },
  {
    img: menu1,
    text: "工具库",
  },
];
const Home = () => {
  return (
    <View className="home">
      <View className="form-block-bg">
        <Time />
      </View>

      <View className="menu_box">
        {menus.map((item, index) => {
          return (
            <View className="menu_item" key={index}>
              <Image src={item.img} mode="widthFix"></Image>
              <View
                className="label"
                style={{ left: (index + 1) % 2 ? "50%" : "24px" }}
              >
                {item.text}
              </View>
            </View>
          );
        })}
      </View>

      <CoverImage src={bg} fixedBottom='-10px' className="bg_img"></CoverImage>
    </View>
  );
};

export default Home;
