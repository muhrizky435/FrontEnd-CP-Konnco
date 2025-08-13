import React, { useRef, useEffect, useState } from "react";
import "../../index.css";

export default function MiniEditor({ label, value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState([]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const next = value || "";
    if (el.innerHTML !== next) el.innerHTML = next;
  }, [value]);

  const getSafeRange = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) return null;
    return range;
  };

  const placeCaret = (node, atStart = false) => {
    const sel = window.getSelection();
    const r = document.createRange();
    if (node.nodeType === 1) {
      if (!node.firstChild) node.appendChild(document.createTextNode(""));
      r.selectNodeContents(node);
      r.collapse(atStart);
    } else {
      r.setStart(node, atStart ? 0 : node.length);
      r.collapse(true);
    }
    sel.removeAllRanges();
    sel.addRange(r);
  };

  const toggleActive = (format) => {
    setActiveFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  // Toggle list
  const toggleList = (type) => {
    const range = getSafeRange();
    if (!range) return;
    toggleActive(type);

    const container = range.commonAncestorContainer;
    const parentList = container.closest?.("ul, ol");

    if (parentList) {
      if (
        (type === "unordered" && parentList.tagName === "UL") ||
        (type === "ordered" && parentList.tagName === "OL")
      ) {
        const fragment = document.createDocumentFragment();
        [...parentList.querySelectorAll("li")].forEach((li) => {
          const p = document.createElement("p");
          p.innerHTML = li.innerHTML;
          fragment.appendChild(p);
        });
        parentList.replaceWith(fragment);
      } else {
        const newList = document.createElement(type === "unordered" ? "ul" : "ol");
        [...parentList.querySelectorAll("li")].forEach((li) => {
          const newLi = document.createElement("li");
          newLi.innerHTML = li.innerHTML;
          newList.appendChild(newLi);
        });
        parentList.replaceWith(newList);
      }
    } else {
      const list = document.createElement(type === "unordered" ? "ul" : "ol");
      const li = document.createElement("li");
      li.innerHTML = range.toString() || "<br>";
      list.appendChild(li);
      range.deleteContents();
      range.insertNode(list);
      placeCaret(li, true);
    }

    onChange(editorRef.current.innerHTML);
  };

  // Inline style toggle
  const applyInline = (cssProp) => {
    const range = getSafeRange();
    if (!range || range.collapsed) return;

    const isActive = activeFormats.includes(cssProp);
    toggleActive(cssProp);

    if (isActive) {
      document.execCommand(cssProp, false, null); 
    } else {
      const selection = range.extractContents();
      const span = document.createElement("span");
      if (cssProp === "bold") span.style.fontWeight = "bold";
      if (cssProp === "italic") span.style.fontStyle = "italic";
      if (cssProp === "underline") span.style.textDecoration = "underline";
      span.appendChild(selection);
      range.insertNode(span);
      placeCaret(span, false);
    }
    onChange(editorRef.current.innerHTML);
  };

  // Block element toggle (H2 / Quote)
  const insertBlock = (tagName) => {
    const range = getSafeRange();
    if (!range) return;

    const isActive = activeFormats.includes(tagName);
    toggleActive(tagName);

    if (isActive) {
      // ubah ke paragraf biasa
      const block = range.commonAncestorContainer.closest?.(tagName);
      if (block) {
        const p = document.createElement("p");
        p.innerHTML = block.innerHTML || "<br>";
        block.replaceWith(p);
        placeCaret(p, false);
      }
    } else {
      const block = document.createElement(tagName);

      if (tagName === "blockquote") {
        block.innerHTML = "❝ ❞";
      } else {
        block.innerHTML = range.toString() || "<br>";
      }

      range.deleteContents();
      range.insertNode(block);
      placeCaret(block, true);
    }

  setTimeout(() => {
    onChange(editorRef.current.innerHTML);
  }, 0);
};

  const handleInput = () => {
    onChange(editorRef.current.innerHTML);
  };

  const btnClass = (format) =>
    `px-2 py-1 border rounded hover:bg-gray-100 ${
      activeFormats.includes(format) ? "bg-orange-200 border-orange-400" : ""
    }`;

  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        <button type="button" onClick={() => toggleList("unordered")} className={btnClass("unordered")}>
          • List
        </button>
        <button type="button" onClick={() => toggleList("ordered")} className={btnClass("ordered")}>
          1. List
        </button>
        <button type="button" onClick={() => applyInline("bold")} className={btnClass("bold")}>
          <b>B</b>
        </button>
        <button type="button" onClick={() => applyInline("italic")} className={btnClass("italic")}>
          <i>I</i>
        </button>
        <button type="button" onClick={() => applyInline("underline")} className={btnClass("underline")}>
          <u>U</u>
        </button>
        <button type="button" onClick={() => insertBlock("h2")} className={btnClass("h2")}>
          H2
        </button>
        <button type="button" onClick={() => insertBlock("blockquote")} className={btnClass("blockquote")}>
          ❝ ❞
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="editor-content w-full border p-3 rounded min-h-40 overflow-auto focus:outline-none focus:ring-2 focus:ring-orange-300 empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]"
        onInput={handleInput}
        data-placeholder={placeholder || "Ketik di sini…"}
      />
    </div>
  );
}
