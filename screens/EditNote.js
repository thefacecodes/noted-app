import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { NotesContext } from "../components/AppContext";

const EditNote = ({ navigation }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");

  const { dispatch } = useContext(NotesContext);

  const {
    params: { note },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit note",
    });
  }, []);

  useEffect(() => {
    if (note) {
      setNewTitle(note.title);
      setNewNote(note.thenote);
    }
  }, []);

  const updateNote = () => {
    const editedNote = { ...note, title: newTitle, thenote: newNote };
    dispatch({ type: "editNote", payload: editedNote });
    navigation.navigate("SingleNote", { note: editedNote });
  };

  return (
    <View className="flex-1 space-y-3 p-4">
      <Text>Title</Text>
      <TextInput
        className="w-full px-2 h-[40px] rounded border"
        value={newTitle}
        onChangeText={(e) => setNewTitle(e)}
      />
      <Text>Note</Text>
      <TextInput
        className="w-full p-2 h-[200px] rounded border"
        multiline={true}
        textAlignVertical={"top"}
        value={newNote}
        onChangeText={(e) => setNewNote(e)}
      />
      <TouchableOpacity
        className="h-[40px] bg-black w-full justify-center items-center rounded-md"
        disabled={note.thenote === newNote && note.title === newTitle}
        onPress={updateNote}
      >
        <Text className="text-base font-Clash text-white">Update Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditNote;
