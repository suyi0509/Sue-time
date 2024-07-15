import { useEffect } from "react";
import { linkTo } from "@/utils";
import { View } from "@tarojs/components";
import { AtTextarea, AtButton, AtSwitch } from "taro-ui";
import { observer } from "mobx-react";
import store from "@/store";

import "./index.scss";

const fontSizeArr = ["mini", "small", "normal", "large"];

const Index = () => {
  useEffect(() => {}, []);

  const handleChange = (key, val) => {
    store.changeTimeSetting(key, val);
  };

  return (
    <View>
      <View className="form-block-bg">
        <AtSwitch
          title="是否显示日期"
          border={false}
          checked={store.getTimeSetting("showDay")}
          onChange={(val) => handleChange("showDay", val)}
        />
        <AtSwitch
          title="是否显示秒数"
          border={false}
          checked={store.getTimeSetting("showSecond")}
          onChange={(val) => handleChange("showSecond", val)}
        />
      </View>
      <View className="form-block-bg">
        <View className="form-item">
          <View className="form-item__title">字体大小</View>
          <View className="font_box">
            {fontSizeArr.map((item) => (
              <AtButton type="primary" size="small" key={item}>
                {item}
              </AtButton>
            ))}
          </View>
        </View>
        <AtTextarea
          value={"11"}
          onChange={(val) => handleChange("", val)}
          maxLength={200}
          placeholder="你的问题是..."
        />
      </View>
      {/* 1. 是否显示日期 showDay 1. 是否显示秒 showSecond 2. 字号: timeSize mini
      small default lager 3. 颜色: 自定义 timeColor 4. 自定义文字: customText */}
    </View>
  );
};

export default observer(Index);
