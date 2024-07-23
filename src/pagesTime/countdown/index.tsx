import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

const numberArr = (n) => {
  const arr: any[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

const arr = [
  {
    key: "hour",
    label: "小时",
    value: numberArr(24),
  },
  {
    key: "minute",
    label: "分钟",
    value: numberArr(60),
  },
  {
    key: "second",
    label: "秒",
    value: numberArr(60),
  },
];
const Index = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [dateTime, setDateTime] = useState(
    dayjs().format("YYYY-MM-DD 00:00:00")
  );
  const [state, setState] = useState<"stop" | "run" | "close">("close"); // 时钟状态

  useEffect(() => {
    const { hour, minute, second } = time;
    const value = `${hour}:${minute}:${second}`;
    const date = dayjs().format(`YYYY-MM-DD ${value}`);
    console.log(date);
    setDateTime(date);
  }, [time]);

  useEffect(() => {
    let runTimer;
    if (state === "run") {
      runTimer = setInterval(() => {
        const value = dayjs(dateTime)
          .subtract(1, "second")
          .format("YYYY-MM-DD HH:mm:ss");
        setDateTime(value);
        if (value.indexOf("00:00:00") !== -1) {
          Taro.vibrateLong();
          handleCancel(); // 结束
          Taro.showModal({
            content: "时间到!!",
            showCancel: false,
            confirmText: "我知道了",
          });
        }
      }, 1000);
    } else if (state === "stop") {
      clearInterval(runTimer);
    } else if (state === "close") {
      clearInterval(runTimer);
    }
    return () => {
      clearInterval(runTimer);
    };
  }, [state, dateTime]);

  const handleCancel = () => {
    setState("close");
    setDateTime(dayjs().format("YYYY-MM-DD 00:00:00"));
    setTime({
      hour: 0,
      minute: 0,
      second: 0,
    });
  };

  return (
    <View>
      {state !== "close" && (
        <View className="dateTime">{dayjs(dateTime).format("HH:mm:ss")}</View>
      )}
      {state === "close" && (
        <View className="countdown_box">
          <View className="show_box"></View>
          {arr.map((item1, index1) => {
            return (
              <View key={index1} className="countdown_box_item">
                <View className="number">
                  <Swiper
                    className="swiper_box"
                    vertical
                    circular
                    current={time[item1.key]}
                    previousMargin="50px"
                    nextMargin="50px"
                    onChange={(e) => {
                      setTime({ ...time, [item1.key]: e.detail.current });
                    }}
                  >
                    {item1.value.map((item2, index2) => {
                      return (
                        <SwiperItem className="swiper_box_item" key={index2}>
                          <View
                            className={classNames("number", {
                              number_act: time[item1.key] === item2,
                            })}
                          >
                            {item2}
                          </View>
                        </SwiperItem>
                      );
                    })}
                  </Swiper>
                </View>
                <View className="label">{item1.label}</View>
              </View>
            );
          })}
        </View>
      )}
      <View className="btn_box">
        <AtButton
          type="primary"
          circle
          onClick={handleCancel}
          className="cancel btn"
          disabled={dayjs(dateTime).format("HH:mm:ss").indexOf("00:00:00") > -1}
        >
          取消
        </AtButton>
        {state === "close" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => setState("run")}
            className="btn"
            disabled={
              dayjs(dateTime).format("HH:mm:ss").indexOf("00:00:00") > -1
            }
          >
            开始
          </AtButton>
        )}
        {state === "run" && (
          <AtButton
            type="primary"
            circle
            onClick={() => setState("stop")}
            className="btn"
          >
            暂停
          </AtButton>
        )}
        {state === "stop" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => setState("run")}
            className="btn"
          >
            恢复
          </AtButton>
        )}
      </View>
    </View>
  );
};

definePageConfig({
  navigationBarTitleText: "倒计时",
});
export default Index;
