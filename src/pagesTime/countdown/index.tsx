import { useEffect } from "react";
import { linkTo } from "@/utils";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

const obj = {
  hours: [1, 2, 3, 4],
  minutes: [1, 2, 3, 4],
  seconds: [1, 2, 3, 4],
};
const arr = [
  {
    label: "小时",
    value: [1, 2, 3, 4],
  },
  {
    label: "分钟",
    value: [1, 2, 3, 4],
  },
  {
    label: "秒",
    value: [1, 2, 3, 4],
  },
];
const Index = () => {
  useEffect(() => {
    // linkTo({
    //   url: `/pages/home/index`,
    // });
  }, []);

  return (
    <View className="countdown_box">
      {arr.map((item1, index1) => {
        return (
          <View key={index1} className="countdown_box_item">
            <View className="number">
              <Swiper vertical circular>
                {item1.value.map((item2, index2) => {
                  return (
                    <SwiperItem key={index2}>
                      <View className="demo-text-1">
                        <View>{item2}</View>
                        <View>2</View>
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
  );
};

export default Index;
