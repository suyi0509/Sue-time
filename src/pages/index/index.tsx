import { useEffect } from "react";
import { linkTo } from "@/utils";
import { View, Image, Text } from "@tarojs/components";

const Index = () => {
  useEffect(() => {
    linkTo({
      url: `/pages/home/index`,
    });
  }, []);
  return <View></View>
};

export default Index;
