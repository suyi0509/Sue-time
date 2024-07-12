import { useEffect } from "react";
import { linkTo } from "@/utils";
import { View } from "@tarojs/components";
import { AtInput, AtButton, AtSwitch } from "taro-ui";
import { observer } from "mobx-react";

import './index.scss'

const Index = () => {
  useEffect(() => {}, []);

  return (
    <View>
      <View className="form-block-bg">
        <AtSwitch
          title="是否显示日期"
          checked={false}
          // onChange={(value) =>
          //   goodsStore.setModel({ goodsstyle: value ? 5 : 1 })
          // }
        />
      </View>
      1. 是否显示日期 showDay 1. 是否显示秒 showSecond 2. 字号: timeSize mini
      small default lager 3. 颜色: 自定义 timeColor 4. 自定义文字: customText
    </View>
  );
};

export default observer(Index);
