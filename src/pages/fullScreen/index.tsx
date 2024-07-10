import { Component, PropsWithChildren, useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import full_screen from "@/assets/icon/full_screen.png";
import { linkTo } from "@/utils";
import Time from "../component/time";

import dayjs from "dayjs";

const FullScreen = () => {
  return <Time size="full" />;
};
export default FullScreen;
