// ✅ FIXED: lexicalEditorToolbar.jsx
import React, { useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  // INSERT_UNORDERED_LIST_COMMAND,
  // INSERT_ORDERED_LIST_COMMAND,
  // INSERT_PARAGRAPH_COMMAND,
} from "lexical";

import { TOGGLE_LINK_COMMAND } from "@lexical/link";
// ❌ Hapus import ini karena menyebabkan error
// import { INSERT_HEADING_COMMAND } from "@lexical/rich-text";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isLink, setIsLink] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            const parent = node.getParent();
            setIsLink($isLinkNode(parent));
          }
          return false;
        },
        1
      )
    );
  }, [editor]);

  const applyStyle = (style) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, style);
  };

  const insertLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md border mb-4">
      <button onClick={() => applyStyle("bold")} className="btn">Bold</button>
      <button onClick={() => applyStyle("italic")} className="btn">Italic</button>
      <button onClick={() => applyStyle("underline")} className="btn">Underline</button>
      <button onClick={() => applyStyle("strikethrough")} className="btn">Strike</button>
      {/* <button onClick={() => editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND)} className="btn">P</button>
      <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)} className="btn">UL</button>
      <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)} className="btn">OL</button> */}
      {isLink ? (
        <button onClick={removeLink} className="btn">Remove Link</button>
      ) : (
        <button onClick={insertLink} className="btn">Link</button>
      )}
    </div>
  );
};

export default ToolbarPlugin;
