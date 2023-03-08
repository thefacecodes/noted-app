import { View, Text, TouchableOp, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NotesContext } from "./AppContext";

const NotePreview = ({ note }) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(NotesContext);

  const LeftSwipeActions = () => {
    return (
      <View className="flex-1 justify-center p-3 bg-green-500 w-full rounded-md">
        {/* <Text className="text-2xl font-bold font-Pop text-white">Delete</Text> */}
        <MaterialCommunityIcons
          name={note.pinned ? "pin-off" : "pin"}
          size={30}
          color="white"
        />
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View className="flex-1 items-end justify-center p-3 bg-red-500 w-full rounded-md">
        {/* <Text className="text-2xl font-bold font-Pop text-white">Delete</Text> */}
        <Ionicons name="ios-trash" size={30} color="white" />
      </View>
    );
  };
  const swipeFromLeftOpen = () => {
    dispatch({ type: "pinNote", payload: note });
    // dispatch({ type: "cancelDownload", payload: info });
  };
  const swipeFromRightOpen = () => {
    dispatch({ type: "deleteNote", payload: note });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={swipeFromRightOpen}
        onSwipeableLeftOpen={swipeFromLeftOpen}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SingleNote", { note })}
          className="p-4 bg-white rounded-md shadow-black w-full"
        >
          <Text className="font-Clash text-base leading-none">
            {note.title}
          </Text>
          <Text numberOfLines={3} className="font-DM text-sm">
            {note.thenote}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default NotePreview;
