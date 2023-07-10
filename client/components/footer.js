import {Text, View} from "react-native";
import React from "react";
import {themeColors} from "../theme";

const Footer = () => {
  return (
    <View
      className="h-28 flex items-center justify-center"
      style={{backgroundColor: themeColors.bgColor(1)}}
    >
      <Text className="text-white mb-4"> Food App &copy; 2023</Text>
    </View>
  );
};

export default Footer;
