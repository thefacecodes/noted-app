import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { NotesContext } from "../components/AppContext";

const AddNote = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [thenote, setNote] = useState("");

  const { dispatch } = useContext(NotesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add new note",
    });
  }, []);

  const addNote = () => {
    const note = {
      id: new Date().getTime(),
      title: title ? title : "Untitled",
      thenote,
      pinned: false,
      date: new Date().toDateString(),
    };
    dispatch({ type: "addNote", payload: note });
    navigation.navigate("Dashboard");
  };

  return (
    <View className="flex-1 space-y-3 p-4">
      <Text>Title</Text>
      <TextInput
        className="w-full px-2 h-[40px] rounded border"
        value={title}
        onChangeText={(e) => setTitle(e)}
      />
      <Text>Note</Text>
      <TextInput
        className="w-full p-2 h-[200px] rounded border"
        multiline={true}
        textAlignVertical={"top"}
        value={thenote}
        onChangeText={(e) => setNote(e)}
      />
      <TouchableOpacity
        className="h-[40px] bg-black w-full justify-center items-center rounded-md"
        disabled={!thenote && !title}
        onPress={addNote}
      >
        <Text className="text-base font-Clash text-white">Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
