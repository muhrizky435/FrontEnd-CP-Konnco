// import React, { useEffect, useState } from "react";
// import AdminNavbar from "../../../components/AdminNavbar";
// import AdminSidebar from "../../../components/AdminSidebar";
// import KonncoLoader from "../../../components/KonncoLoader";
// import { useNavigate, useParams } from "react-router-dom";
// import { RichTextEditor } from "@mantine/rte";

// const EditProductAdmin = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState(true);
//   const [mainImage, setMainImage] = useState(null);
//   const [thumbnailImages, setThumbnailImages] = useState([]);
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [features, setFeatures] = useState("");
//   const [advantages, setAdvantages] = useState("");

//   useEffect(() => {
//     // Simulasi fetch data produk
//     setTimeout(() => {
//       // Misal kita set data dummy dulu
//       setProductName("Contoh Produk");
//       setDescription("<p>Deskripsi awal</p>");
//       setFeatures("<ul><li>Fitur 1</li><li>Fitur 2</li></ul>");
//       setAdvantages("<p>Keunggulan produk</p>");
//       setIsLoading(false);
//     }, 800);
//   }, [id]);

//   const handleUpdate = () => {
//     // Validasi & kirim ke API
//     console.log({ productName, description, features, advantages, mainImage, thumbnailImages });
//     alert("Produk berhasil diubah!");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setMainImage(file);
//   };

//   const handleAddThumbnail = () => {
//     setThumbnailImages([...thumbnailImages, null]);
//   };

//   const handleThumbnailChange = (e, index) => {
//     const file = e.target.files[0];
//     const updated = [...thumbnailImages];
//     updated[index] = file;
//     setThumbnailImages(updated);
//   };

//   if (isLoading) return <KonncoLoader />;

//   return (
//     <div className="flex bg-black text-white min-h-screen">
//       <AdminSidebar />
//       <div className="flex-1">
//         <AdminNavbar />

//         <div className="p-4 space-y-6">
//           <button onClick={() => navigate(-1)} className="text-orange-500 font-bold">&larr; Kembali</button>

//           <h2 className="text-xl font-bold">Edit Produk: {id}</h2>

//           {/* Upload Gambar Utama */}
//           <div className="bg-gray-300 rounded-lg h-60 flex items-center justify-center relative">
//             <label className="cursor-pointer">
//               <input type="file" className="hidden" onChange={handleImageChange} />
//               <div className="bg-white w-14 h-14 rounded-md flex items-center justify-center text-2xl text-gray-500">+</div>
//             </label>
//           </div>

//           {/* Upload Thumbnail */}
//           <div className="flex flex-wrap gap-2">
//             {thumbnailImages.map((img, index) => (
//               <input key={index} type="file" onChange={(e) => handleThumbnailChange(e, index)} />
//             ))}
//             <button onClick={handleAddThumbnail} className="bg-orange-500 px-2 rounded">+</button>
//           </div>

//           {/* Nama Produk */}
//           <input
//             type="text"
//             className="w-full p-2 rounded text-black"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             placeholder="Nama Produk"
//           />

//           {/* Deskripsi */}
//           <div>
//             <label className="block mb-2 font-semibold">Deskripsi Produk</label>
//             <RichTextEditor value={description} onChange={setDescription} />
//           </div>

//           {/* Fitur */}
//           <div>
//             <label className="block mb-2 font-semibold">Fitur</label>
//             <RichTextEditor value={features} onChange={setFeatures} />
//           </div>

//           {/* Keunggulan */}
//           <div>
//             <label className="block mb-2 font-semibold">Keunggulan</label>
//             <RichTextEditor value={advantages} onChange={setAdvantages} />
//           </div>

//           {/* Tombol Ubah */}
//           <div className="text-right">
//             <button onClick={handleUpdate} className="bg-orange-500 px-6 py-2 rounded font-semibold">Ubah</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductAdmin;
