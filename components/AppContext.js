import { View, Text } from "react-native";
import React, { createContext, useReducer } from "react";

export const NotesContext = createContext();

const initial = {
  notes: [
    {
      id: 49,
      title: "Sometimes it's just better not to be seen.",
      thenote:
        "Sometimes it's just better not to be seen. That's how Harry had always lived his life. He prided himself as being the fly on the wall and the fae that blended into the crowd. That's why he was so shocked that she noticed him.",
      userId: 14,
      pinned: false,
      tags: ["french", "classic"],
      reactions: 2,
    },
    {
      id: 136,
      title: "You must thrive in spite of yourself",
      thenote:
        "You must thrive in spite of yourself; and so that you may do it, God takes out your heart of flesh, and gives you a heart of stone.",
      userId: 14,
      pinned: false,
      tags: ["fiction", "french", "mystery"],
      reactions: 0,
    },
    {
      id: 18,
      title: "She had a terrible habit of comparing her life to others",
      thenote:
        "She had a terrible habit of comparing her life to others. She realized that their life experiences were completely different than her own and that she saw only what they wanted her to see, but that didn't matter. She still compared herself and yearned for what she thought they had and she didn't.",
      userId: 28,
      pinned: false,
      tags: ["history", "french", "love"],
      reactions: 3,
    },
    {
      id: 11,
      title: "It wasn't quite yet time to panic.",
      pinned: false,
      thenote:
        "It wasn't quite yet time to panic. There was still time to salvage the situation. At least that is what she was telling himself. The reality was that it was time to panic and there wasn't time to salvage the situation, but he continued to delude himself into believing there was.",
      userId: 25,
      tags: ["mystery", "american", "history"],
      reactions: 5,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addNote":
      const addedNote = [action.payload, ...state.notes];
      return {
        ...state,
        notes: addedNote,
      };

    case "deleteNote":
      const afterDelete = state.notes.filter(
        (note) => note.id !== action.payload.id
      );
      return {
        ...state,
        notes: afterDelete,
      };

    case "pinNote":
      const pinCheck = { ...action.payload, pinned: !action.payload.pinned };
      const replaceNote = state.notes.map((item) =>
        item.id === action.payload.id ? pinCheck : item
      );
      return {
        ...state,
        notes: replaceNote,
      };

    case "editNote":
      const updateEdit = state.notes.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        notes: updateEdit,
      };

    default:
      return state;
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const sharedState = { state, dispatch };
  return (
    <NotesContext.Provider value={sharedState}>
      {children}
    </NotesContext.Provider>
  );
};

export default AppContext;
