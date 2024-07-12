import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import classnames from "classnames";
import full_screen from "@/assets/images/full_screen.png";
import home_top from "@/assets/images/home_top.png";
import { linkTo } from "@/utils";
import { observer } from "mobx-react";
import store from "@/store";
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
      const time = dayjs().format("HH:mm:ss");
      store.changeTimeSettingObj({
        day,
        time,
      });
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

  const handleSetting = () => {
    linkTo({
      url: `/pages/home/setting/index`,
    });
  };

  const { day, hourMinute, second } = store.getTimeSetting();
  return (
    <View className="time_box">
      <View
        className={classnames("time_box_time", {
          full_screen: size === SizeEnum.FULLSIZE,
        })}
      >
        {hourMinute}:{second}
      </View>
      {size === SizeEnum.DEFAULTSIZE && (
        <View className="time_box_setting">
          <View
            className="at-icon at-icon-settings icon"
            onClick={handleSetting}
          ></View>
          <View className="day">{nowDay}</View>
          <Image
            src={full_screen}
            className="icon"
            onClick={toFullScreen}
          ></Image>
        </View>
      )}
      {size === SizeEnum.FULLSIZE && (
        <View
          className="at-icon at-icon-settings full-icon"
          onClick={handleSetting}
        ></View>
      )}
    </View>
  );
};

export default observer(Time);
