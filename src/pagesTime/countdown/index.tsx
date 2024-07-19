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
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    label: "分钟",
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    label: "秒",
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
              <Swiper
                className="swiper_box"
                vertical
                circular
                previousMargin="50px"
                nextMargin="50px"
              >
                {item1.value.map((item2, index2) => {
                  return (
                    <SwiperItem className="swiper_box_item" key={index2}>
                      <View className="number">{item2}</View>
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
