import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import classnames from "classnames";
import full_screen from "@/assets/icon/full_screen.png";
import top from "@/assets/icon/top.png";
import { linkTo } from "@/utils";
import dayjs from "dayjs";

import { SizeEnum } from "../config";

import "./index.scss";

interface IProps {
  size?: SizeEnum;
}

const Time = (props: IProps) => {
  const { size = SizeEnum.DEFAULTSIZE } = props;
  const [nowDay, SetNowDay] = useState(dayjs().format("YYYY-MM-DD"));
  const [nowTime, SetNowTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const day = dayjs().format("YYYY-MM-DD");
      if (day !== nowDay) SetNowDay(day);
      const time = dayjs().format("HH:mm:ss");
      SetNowTime(time);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const toFullScreen = () => {
    linkTo({
      url: `/pages/fullScreen/index`,
    });
  };

  return (
    <View className="time_box">
      {size === SizeEnum.DEFAULTSIZE && (
        <View className="time_box_setting">
          <View className="at-icon at-icon-settings icon"></View>
          <View className="day">{nowDay}</View>
          <Image
            src={full_screen}
            className="icon"
            onClick={toFullScreen}
          ></Image>
        </View>
      )}
      <View
        className={classnames("time_box_time", {
          full_screen: size === SizeEnum.FULLSIZE,
        })}
      >
        {size === SizeEnum.FULLSIZE && <Image
          src={top}
          className="top_icon"
          onClick={toFullScreen}
        ></Image>}
        {nowTime}
      </View>

      {size === SizeEnum.FULLSIZE && (
        <View className="at-icon at-icon-settings full-icon"></View>
      )}
    </View>
  );
};

export default Time;
