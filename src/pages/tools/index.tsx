import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
