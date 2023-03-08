import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import * as Progress from "react-native-progress";

const Loading = ({ setLoading }) => {
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Image
        source={require("../assets/logo.png")}
        className="w-[250px] h-[250px] object-contain"
      />

      <View className="absolute bottom-16 space-y-3 items-center justify-center">
        <Progress.Pie
          className=""
          indeterminate={true}
          size={50}
          color={"black"}
        />
        <Text className="text-base font-Clash">
          &copy; {new Date().getFullYear()} &nbsp;| The Face Codes{" "}
        </Text>
      </View>
    </View>
  );
};

export default Loading;
