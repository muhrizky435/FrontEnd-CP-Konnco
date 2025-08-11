import React from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };

  return (
    <div className="flex gap-2 border-b pb-2 mb-2">
      <button
        onClick={() => applyFormat("bold")}
        className="px-2 py-1 border rounded text-sm"
      >
        Bold
      </button>
      <button
        onClick={() => applyFormat("italic")}
        className="px-2 py-1 border rounded text-sm"
      >
        Italic
      </button>
      <button
        onClick={() => applyFormat("underline")}
        className="px-2 py-1 border rounded text-sm"
      >
        Underline
      </button>
    </div>
  );
};
