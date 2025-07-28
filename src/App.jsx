import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import About from './page/AboutApp';
import Product from './page/ProductApp';
import Detail_Product from './page/Detail-Product';
import Blogs from './page/BlogsApp';
import Detail_blogs from './page/Detail-Blogs';
import Contact from './page/ContactApp';
import Careers from './page/CareersApp';
import Detail_Careers from './page/Detail-Careers';
import Careers_Apply from './page/CareersApply';
import ThanksApp from './page/Thanks';

import AuthAdmin from './panels/admins/auth/Login';
import ForgotPassword from './panels/admins/auth/Forgot-Password';
import DashboardAdmin from './panels/admins/dashboard/Dashboard-Admin';
import BlogsAdmin from './panels/admins/blog/Blogs-Admin';
import Detail_Blogs from './panels/admins/blog/Detail-Blogs-Admin';
import Edit_Blogs from './panels/admins/blog/Edit-Blogs-Admin';
import Add_Blogs from './panels/admins/blog/Add-Blogs-Admin';
import Product_Admin from './panels/admins/product/Product-Admin';
import Detail_Product_Admin from './panels/admins/product/Detail-Product-Admin';
// import Edit_Product_Admin from './panels/admins/product/Edit-Product-Admin';

// Guard component
const AdminGuard = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/panels/admins/auth/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detail_product/:productId" element={<Detail_Product />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/detail_blogs/:slug" element={<Detail_blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/detail_careers" element={<Detail_Careers />} />
        <Route path="/careers_apply/:careerId" element={<Careers_Apply />} />
        <Route path="/thanks" element={<ThanksApp />} />


        {/* Admin Auth Routes */}
        <Route path="/panels/admins/auth/login" element={<AuthAdmin />} />
        <Route path="/panels/admins/auth/forgot_password" element={<ForgotPassword />} />

        {/* Protected Admin Panel Routes */}
        <Route path="/panels/admins/dashboard" element={
          <AdminGuard><DashboardAdmin /></AdminGuard>
        } />
        <Route path="/panels/admins/blogs" element={
          <AdminGuard><BlogsAdmin /></AdminGuard>
        } />
        <Route path="/panels/admins/blogs/detail_blogs/:slug" element={
          <AdminGuard><Detail_Blogs /></AdminGuard>
        } />
        <Route path="/panels/admins/blogs/edit_blogs/:slug" element={
          <AdminGuard><Edit_Blogs /></AdminGuard>
        } />
        <Route path="/panels/admins/blogs/add_blogs" element={
          <AdminGuard><Add_Blogs /></AdminGuard>
        } />
        <Route path="/panels/admins/product" element={
          <AdminGuard><Product_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/product/detail/:id" element={
          <AdminGuard><Detail_Product_Admin /></AdminGuard>
        } />
        {/* <Route path="/panels/admins/product/edit/:id" element={
          <AdminGuard><Edit_Product_Admin /></AdminGuard>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;
