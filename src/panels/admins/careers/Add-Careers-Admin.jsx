// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "../../../components/AdminSidebar";
// import AdminNavbar from "../../../components/AdminNavbar";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import ToolbarPlugin from "../../../components/rich-text/LexicalEditorToolbarPlugin";
// import { $generateHtmlFromNodes } from "@lexical/html";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import api from "../../../api/axios";

// const editorConfig = {
//   namespace: "KonncoEditor",
//   theme: {},
//   onError(error) {
//     throw error;
//   },
// };

// const AddCareerAdmin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     salaryMin: "",
//     salaryMax: "",
//     requirements: [],
//     type: "",
//     linkedin: "",
//     jobstreet: "",
//     glints: "",
//     tags: [],
//   });
//   const [descriptionHTML, setDescriptionHTML] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditorChange = (editorState) => {
//     editorState.read(() => {
//       const html = $generateHtmlFromNodes(editorState);
//       setDescriptionHTML(html);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       ...formData,
//       description: descriptionHTML,
//     };

//     try {
//       await api.post("/admins/careers", data);
//       navigate("/admin/careers");
//     } catch (error) {
//       console.error("Gagal tambah karir", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <div className="flex-1">
//         <AdminNavbar />
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">Tambah Karir</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium">Judul</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Deskripsi</label>
//               <LexicalComposer initialConfig={editorConfig}>
//                 <div className="editor-container border p-4 rounded">
//                   <ToolbarPlugin />
//                   <RichTextPlugin
//                     contentEditable={<ContentEditable className="editor-input min-h-[200px]" />}
//                     placeholder={<div className="text-gray-400">Tulis deskripsi karir di sini...</div>}
//                   />
//                   <OnChangePlugin onChange={handleEditorChange} />
//                   <HistoryPlugin />
//                   <ListPlugin />
//                   <LinkPlugin />
//                   <CodeHighlightPlugin />
//                 </div>
//               </LexicalComposer>
//             </div>

//             <div className="flex gap-2">
//               <div className="flex-1">
//                 <label className="block font-medium">Range Gaji (Awal)</label>
//                 <input
//                   type="number"
//                   name="salaryMin"
//                   value={formData.salaryMin}
//                   onChange={handleChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block font-medium">Range Gaji (Akhir)</label>
//                 <input
//                   type="number"
//                   name="salaryMax"
//                   value={formData.salaryMax}
//                   onChange={handleChange}
//                   className="w-full border px-3 py-2 rounded"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block font-medium">Tipe Pekerjaan</label>
//               <input
//                 type="text"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block font-medium">LinkedIn (opsional)</label>
//               <input
//                 type="text"
//                 name="linkedin"
//                 value={formData.linkedin}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block font-medium">JobStreet (opsional)</label>
//               <input
//                 type="text"
//                 name="jobstreet"
//                 value={formData.jobstreet}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block font-medium">Glints (opsional)</label>
//               <input
//                 type="text"
//                 name="glints"
//                 value={formData.glints}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded"
//             >
//               Tambah
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCareerAdmin;
