import { useEffect, useState } from "react";

const QuillEditor = ({ value, onChange }) => {
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
      import("react-quill/dist/quill.snow.css");
    });
  }, []);

  if (!ReactQuill) return <p className="text-gray-500">Loading editor...</p>;

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      style={{ minHeight: "200px" }}
    />
  );
};

export default QuillEditor;
