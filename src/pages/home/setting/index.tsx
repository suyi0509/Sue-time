import Taro from "@tarojs/taro";
import { useState } from "react";
import { View } from "@tarojs/components";
import { AtTextarea, AtButton, AtSwitch } from "taro-ui";
import { observer } from "mobx-react";
import store from "@/store";
import { toast } from "@/utils";
import { FontSizeEnum, enumToArr } from "../../config";

import "./index.scss";

// const fontSizeArr = ["mini", "small", "normal", "large"];

const Index = () => {
  const [model, setModel] = useState(store.getTimeSetting());

  const handleChange = (key, val) => {
    setModel({
      ...model,
      [key]: val,
    });
  };

  const handleClick = () => {
    store.changeTimeSettingObj(model);
    toast("保存成功");
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  };

  return (
    <View>
      <View className="form-block-bg">
        <AtSwitch
          title="是否显示日期"
          border={false}
          checked={model.showDay}
          color="#d4237a"
          onChange={(val) => handleChange("showDay", val)}
        />
        <AtSwitch
          title="是否显示秒数"
          border={false}
          checked={model.showSecond}
          onChange={(val) => handleChange("showSecond", val)}
        />
      </View>
      <View className="form-block-bg">
        <View className="form-item">
          <View className="form-item__title">字体大小</View>
          <View className="font_box">
            {enumToArr(FontSizeEnum).map((item, index) => (
              <AtButton
                type={item.value === model.timeSize ? "primary" : "secondary"}
                size="small"
                key={index}
                onClick={() => handleChange("timeSize", item.value)}
              >
                {item.label}
              </AtButton>
            ))}
          </View>
        </View>
        <View className="text_form">
          <View className="form-item__title">自定义文字</View>
          <AtTextarea
            value={model.customText}
            onChange={(val) => handleChange("customText", val)}
            maxLength={20}
            placeholder="请输入自定义文字"
          />
        </View>
      </View>
      <View className="form-action fixed-bottom">
        <View className="form-action__button">
          <AtButton
            type="secondary"
            onClick={() => {
              Taro.navigateBack();
            }}
          >
            取消
          </AtButton>
        </View>
        <View className="form-action__button">
          <AtButton type="primary" onClick={handleClick}>
            保存
          </AtButton>
        </View>
      </View>
      {/* 1. 是否显示日期 showDay 1. 是否显示秒 showSecond 2. 字号: timeSize mini
      small default lager 3. 颜色: 自定义 timeColor 4. 自定义文字: customText */}
    </View>
  );
};

Index.config = {
  navigationBarTitleText: "时钟设置",
};

export default observer(Index);
