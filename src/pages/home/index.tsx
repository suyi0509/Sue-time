import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import full_screen from "@/assets/icon/full_screen.png";
import { linkTo } from "@/utils";
import dayjs from "dayjs";

import Time from "../component/time";

import "./index.scss";

const Home = () => {
  return (
    <View>
      <View className="form-block-bg">
        <Time />
      </View>
    </View>
  );
};

export default Home;
