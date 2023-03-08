import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { NotesContext } from "../components/AppContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SingleNote = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { dispatch } = useContext(NotesContext);
  const {
    params: { note },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Note",
      headerRight: () => <ShowOptions />,
    });
  }, []);

  const showMenuOptions = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const ShowOptions = () => {
    return (
      <TouchableOpacity
        onPress={showMenuOptions}
        className="h-[40px] w-[40px] justify-center items-center border-2 border-black bg-white rounded"
      >
        <SimpleLineIcons name="options-vertical" size={20} color="black" />
      </TouchableOpacity>
    );
  };

  const Menus = () => {
    return (
      <View className="bg-white rounded-md py-2 space-y-2">
        <TouchableOpacity
          className="px-4 py-2 flex-row space-x-2 items-center"
          onPress={() => {
            navigation.navigate("EditNote", { note });
            setShowMenu(false);
          }}
        >
          <AntDesign name="edit" size={20} color="black" />
          <Text className="text-base font-DM">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "deleteNote", payload: note });
            navigation.navigate("Dashboard");
          }}
          className="px-4 py-2 flex-row space-x-2 items-center"
        >
          <Ionicons name="ios-trash" size={20} color="black" />
          <Text className="text-base font-DM">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "pinNote", payload: note });
            setShowMenu(false);
          }}
          className="px-4 py-2 flex-row space-x-2 items-center"
        >
          {note.pinned ? (
            <>
              <MaterialCommunityIcons name="pin-off" size={20} color="black" />
              <Text className="text-base font-DM">Unpin</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="pin" size={20} color="black" />
              <Text className="text-base font-DM">Pin</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (!note) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Progress.Pie
          className=""
          indeterminate={true}
          size={50}
          color={"white"}
        />
        {/* <ActivityIndicator /> */}
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {showMenu && (
        <View className="z-50 absolute -top-4 right-0 rounded shadow-black w-[150px] py-4">
          <Menus />
        </View>
      )}
      <Text className="text-xl mb-4 font-Clash">{note.title}</Text>
      <Text className="text-base font-DM">{note.thenote}</Text>
    </View>
  );
};

export default SingleNote;
