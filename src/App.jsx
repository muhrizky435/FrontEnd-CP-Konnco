import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public 
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

// Admin
import AuthAdmin from './panels/admins/auth/Login';
import ForgotPassword from './panels/admins/auth/Forgot-Password';
import DashboardAdmin from './panels/admins/dashboard/Dashboard-Admin';

// Blogs
import BlogsAdmin from './panels/admins/blog/Blogs-Admin';
import Detail_Blogs from './panels/admins/blog/Detail-Blogs-Admin';
import Edit_Blogs from './panels/admins/blog/Edit-Blogs-Admin';
import Add_Blogs from './panels/admins/blog/Add-Blogs-Admin';

// Product
import Product_Admin from './panels/admins/product/Product-Admin';
import Detail_Product_Admin from './panels/admins/product/Detail-Product-Admin';
import Add_Product_Admin from './panels/admins/product/Add-Product-Admin';
import Edit_Product_Admin from './panels/admins/product/Edit-Product-Admin';

// Careers
import Careers_Admin from './panels/admins/careers/Careers-Admin';
import Detail_Careers_Admin from './panels/admins/careers/Detail-Careers-Admin';
// import Add_Careers_Admin from './panels/admins/careers/Add-Careers-Admin';
// import Edit_Careers_Admin from './panels/admins/careers/Edit-Careers-Admin';
import Apply_Careers_Admin from './panels/admins/careers/Apply-Careers-Admin';
import Detail_Apply_Careers_Admin from './panels/admins/careers/Detail-Apply-Careers-Admin';
import Inquiries_Admin from './panels/admins/inquiries/Inquiries-Admin';
import Detail_Inquiries_Admin from './panels/admins/inquiries/Detail-Inquiries-Admin';

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
        <Route path="/detail_careers/:careerId" element={<Detail_Careers />} />
        <Route path="/careers_apply/:careerId" element={<Careers_Apply />} />
        <Route path="/thanks" element={<ThanksApp />} />


        {/* Admin Auth Routes */}
        <Route path="/panels/admins/auth/login" element={<AuthAdmin />} />
        <Route path="/panels/admins/auth/forgot_password" element={<ForgotPassword />} />

        {/* Protected Admin Panel Routes -- Dashboard */}
        <Route path="/panels/admins/dashboard" element={
          <AdminGuard><DashboardAdmin /></AdminGuard>
        } />


        {/* Blogs Admin */}
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


        {/* Products Admin */}
        <Route path="/panels/admins/product" element={
          <AdminGuard><Product_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/product/detail/:productId" element={
          <AdminGuard><Detail_Product_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/product/add_product" element={
          <AdminGuard><Add_Product_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/product/edit/:productId" element={
          <AdminGuard><Edit_Product_Admin /></AdminGuard>
        } />


        {/* careers Admin */}
        <Route path="/panels/admins/careers" element={
          <AdminGuard><Careers_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/careers/detail_careers/:careerId" element={
          <AdminGuard><Detail_Careers_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/careers/applications" element={
          <AdminGuard><Apply_Careers_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/careers/:careerId/applications/:applicationId" element={
          <AdminGuard><Detail_Apply_Careers_Admin /></AdminGuard>
        } />

        {/* <Route path="/panels/admins/careers/add_careers" element={
          <AdminGuard><Add_Careers_Admin /></AdminGuard>
        } /> */}
        {/* <Route path="/panels/admins/careers/edit_careers/:id" element={
          <AdminGuard><Edit_Careers_Admin /></AdminGuard>
        } /> */}

        {/* Inquiries */}
        <Route path="/panels/admins/inquiries" element={
          <AdminGuard><Inquiries_Admin /></AdminGuard>
        } />
        <Route path="/panels/admins/inquiries/detail_inquiries/:inquiryId" element={
          <AdminGuard><Detail_Inquiries_Admin /></AdminGuard>
        } />

        {/* Fallback Route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        {/* not found 404 */}

      </Routes>
    </Router>
  );
}

export default App;
