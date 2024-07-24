import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { View } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
import duration from "dayjs/plugin/duration";
import { observer } from "mobx-react";
import store from "@/store";
import "./index.scss";
import { toast } from "@/utils";

const Index = () => {
  const [model, setModel] = useState(store.getFocuson());

  useEffect(() => {
    console.log("会走吗");
    setModel(store.getFocuson());
  }, [store.focuson]);

  const tabList = [
    { value: 15, title: "15分钟" },
    { value: 30, title: "30分钟" },
  ];

  const secondsToMinutesSeconds = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  const handleTabChange = (e) => {
    if (model.state === "run") {
      {
        Taro.showModal({
          content: "切换会导致计时中断噢,请再次确认",
          success: () => {
            setFouse(e);
          },
        });
      }
    } else {
      setFouse(e);
    }
  };
  const setFouse = (e) => {
    store.changeFocusonObj({
      state: "close",
      curTab: e ? 30 : 15,
      time: e ? 30 * 60 : 15 * 60,
    });
  };

  const handleState = (type) => {
    store.changeFocusonObj({
      state: type,
    });
    store.intervalFocuson();
  };

  const handleCancel = () => {
    store.changeFocusonObj({
      state: "close", // stop | run | close
      time: model.curTab * 60, // 秒
    });
    store.intervalFocuson();
  };

  return (
    <View>
      <AtTabs
        current={model.curTab === 15 ? 0 : 1}
        tabList={tabList}
        onClick={(e) => {
          handleTabChange(e);
        }}
      ></AtTabs>
      <View className="dateTime">{secondsToMinutesSeconds(model.time)}</View>
      <View className="btn_box">
        <AtButton
          type="primary"
          circle
          onClick={() => handleCancel()}
          className="cancel btn"
        >
          取消
        </AtButton>
        {model.state !== "run" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => handleState("run")}
            className="btn"
          >
            启动
          </AtButton>
        )}
        {model.state === "run" && (
          <AtButton
            type="secondary"
            circle
            onClick={() => handleState("stop")}
            className="btn"
          >
            暂停
          </AtButton>
        )}
      </View>
    </View>
  );
};

definePageConfig({
  navigationBarTitleText: "专注番茄",
});
export default observer(Index);
