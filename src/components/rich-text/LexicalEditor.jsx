// components/LexicalEditor.jsx
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ToolbarPlugin } from "./LexicalToolbar";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";

import "./index.css";

const theme = {
  // bisa di-custom sesuai keinginan (default styling)
};

const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError(error) {
    throw error;
  },
  nodes: [],
};

export default function LexicalEditor({ onChange }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-md p-2 bg-white">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] outline-none p-2" />
          }
          placeholder={<div className="text-gray-400 p-2">Deskripsi Karir...</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const root = $getRoot();
              onChange(root.getTextContent());
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
