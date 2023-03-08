import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/AntDesign";
import { NotesContext } from "../components/AppContext";
import NotePreview from "../components/NotePreview";

const Dashboard = ({ navigation }) => {
  const { state } = useContext(NotesContext);
  const [normalNotes, setNormal] = useState([]);
  const [pinn, setPinned] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: "My Notes",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "black",
      },
    });
  }, []);

  useEffect(() => {
    const pinned = state.notes.filter((item) => item.pinned);
    setPinned(pinned);
    const normal = state.notes.filter((item) => !item.pinned);
    setNormal(normal);
  }, [state]);

  const Separate = () => {
    return <View className="my-1"></View>;
  };

  if (!state.notes) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Progress.Pie
          className=""
          indeterminate={true}
          size={50}
          color={"white"}
        />
      </View>
    );
  }

  if (state.notes.length < 1) {
    return (
      <View className="flex-1 w-full bg-white items-center justify-center">
        <View className="justify-center items-center">
          <Image
            source={require("../assets/empty.jpg")}
            className="h-[200px] grayscale w-[200px]"
          />
          <Text className="font-DM text-xl font-bold">No notes yet.</Text>
        </View>
        <View className="absolute bottom-0 left-0 right-0 h-[100px] p-2">
          <TouchableOpacity
            onPress={() => navigation.navigate("AddNote")}
            className="h-[50px] w-[50px] rounded-full justify-center left-[250px] items-center bg-black"
          >
            <Ionicons name="pluscircle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full pt-12 pb-4 px-4">
      {pinn.length > 0 && (
        <View>
          <Text className="text-2xl font-Clash mb-2">Pinned Notes</Text>
          <FlatList
            data={pinn}
            renderItem={({ item }) => <NotePreview note={item} />}
            keyExtractor={(item) => item?.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={Separate}
          />
        </View>
      )}

      {normalNotes.length > 0 && (
        <Text className="text-2xl font-Clash my-2">My Notes</Text>
      )}
      <FlatList
        data={normalNotes}
        renderItem={({ item }) => <NotePreview note={item} />}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separate}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("AddNote")}
        className="h-[50px] w-[50px] rounded-full justify-center fixed bottom-6 left-[250px] items-center bg-black"
      >
        <Ionicons name="pluscircle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
