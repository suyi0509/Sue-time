import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { View} from "@tarojs/components";
import { AtButton } from "taro-ui";
import duration from "dayjs/plugin/duration";
import "./index.scss";

dayjs.extend(duration);

const Index = () => {
  const [time, setTime] = useState(0);
  const [dateTime, setDateTime] = useState("00:00:00:00");
  const [state, setState] = useState<"stop" | "run" | "close">("close"); // 时钟状态
  const [arrList, setArrList] = useState<any[]>([]);

  useEffect(() => {
    let timer;
    if (state === "run") {
      timer = setInterval(() => {
        setTime(time + 1);
        const value = convertSecondsToHMSM(time + 1);
        setDateTime(value);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [time, state]);

  function convertSecondsToHMSM(seconds) {
    const timeObject = dayjs.duration(seconds * 10).format("HH:mm:ss:SSS");
    return timeObject.substring(0, 11);
  }

  const handleDebb = () => {
    setArrList([...arrList, dateTime]);
  };

  const handleCancel = () => {
    setState("close");
    setArrList([]);
    setTime(0);
  };

  return (
    <View>
      <View className="dateTime">{dateTime}</View>
      <View className="btn_box">
        {state === "run" && (
          <AtButton
            type="primary"
            circle
            onClick={handleDebb}
            className="cancel btn"
          >
            计次
          </AtButton>
        )}
        {state !== "run" && (
          <AtButton
            type="primary"
            circle
            onClick={() => handleCancel()}
            className="cancel btn"
          >
            复位
          </AtButton>
        )}
        {state !== "run" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => setState("run")}
            className="btn"
          >
            启动
          </AtButton>
        )}
        {state === "run" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => setState("stop")}
            className="btn"
          >
            暂停
          </AtButton>
        )}
      </View>
      {arrList.length ? (
        <View className="record_box form-block-bg">
          {arrList.map((item, index) => {
            return (
              <View key={index} className="record_box_item">
                第{index + 1}次计时: {item}
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

definePageConfig({
  navigationBarTitleText: "秒表",
});
export default Index;
