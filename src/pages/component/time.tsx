import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import full_screen from "@/assets/icon/full_screen.png";
import { linkTo } from "@/utils";

import dayjs from "dayjs";

import "./index.scss";

interface IProps {
  size?: "defalut" | "full";
}

const Time = (props: IProps) => {
  const { size = "dafalut" } = props;
  const [nowDay, SetNowDay] = useState(dayjs().format("YYYY-MM-DD"));
  const [nowTime, SetNowTime] = useState("");

  useEffect(() => {
    return () => {
      clearInterval(initData);
    };
  }, []);

  const initData = setInterval(() => {
    const day = dayjs().format("YYYY-MM-DD");
    if (day !== nowDay) SetNowDay(day);
    const time = dayjs().format("HH:mm:ss");
    SetNowTime(time);
  });

  const toFullScreen = () => {
    linkTo({
      url: `/pages/fullScreen/index`,
    });
  };

  return (
    <View className="time_box">
      <View className="time_box_setting">
        <View className="at-icon at-icon-settings icon"></View>
        <View className="day">{nowDay}</View>
        <Image
          src={full_screen}
          className="icon"
          onClick={toFullScreen}
        ></Image>
      </View>
      <View className="time_box_time">{nowTime}</View>
    </View>
  );
};

export default Time;
