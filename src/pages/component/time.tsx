import { useEffect } from "react";
import { View, Image } from "@tarojs/components";
import classnames from "classnames";
import full_screen from "@/assets/images/full_screen.png";
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
  // const [nowDay, SetNowDay] = useState(dayjs().format("YYYY-MM-DD"));
  // const [nowTime, SetNowTime] = useState("");

  const {
    day,
    hourMinute,
    second,
    showDay,
    showSecond,
    timeSize,
    timeColor,
    customText,
  } = store.getTimeSetting();

  useEffect(() => {
    if (!showSecond) return;
    const timer = setInterval(() => {
      const dayNow = dayjs().format("YYYY-MM-DD");
      const time = dayjs().format("HH:mm:ss");
      store.changeTimeSettingObj({
        day: dayNow,
        time,
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [showSecond]);

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

  return (
    <View className="time_box">
      <View
        className={classnames("time_box_time", {
          full_screen: size === SizeEnum.FULLSIZE,
        })}
        style={{
          fontSize: timeSize * (size === SizeEnum.FULLSIZE ? 1.5 : 1) + "px",
        }}
      >
        <View className="time">
          {hourMinute}
          {showSecond && `:${second}`}
        </View>
        {size === SizeEnum.DEFAULTSIZE && customText && (
          <View className="customText">{customText}</View>
        )}
      </View>
      {size === SizeEnum.DEFAULTSIZE && (
        <View className="time_box_setting">
          <View
            className="at-icon at-icon-settings icon"
            onClick={handleSetting}
          ></View>
          {showDay && <View className="day">{day}</View>}
          <Image
            src={full_screen}
            className="icon"
            onClick={toFullScreen}
          ></Image>
        </View>
      )}
      {size === SizeEnum.FULLSIZE && (
        <View className="full_box_setting">
          {showDay && <View className="day">{day}</View>}
          {customText && <View className="customText">{customText}</View>}
          <View
            className="at-icon at-icon-settings full-icon"
            onClick={handleSetting}
          ></View>
        </View>
      )}
    </View>
  );
};

export default observer(Time);
