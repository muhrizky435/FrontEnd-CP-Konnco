import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/AboutApp'
import Product from './page/ProductApp'
import Detail_Product from './page/Detail-Product'
import Blogs from './page/BlogsApp'
import Detail_blogs from './page/Detail-Blogs'
import Contact from './page/ContactApp'
import Careers from './page/CareersApp'
import Detail_Careers from './page/Detail-Careers'
import Careers_Apply from './page/CareersApply'
import './App.css'
// Admin
import DashboardAdmin from './panel_admin/admin/dashboard/DashboardAdmin'
import BlogsAdmin from './panel_admin/admin/blog/BlogsAdmin'
import Detail_Blog from './panel_admin/admin/blog/Detail_Blog'
import Edit_Blog from './panel_admin/admin/blog/Edit_Blog'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* product */}
        <Route path="/product" element={<Product />} />
        <Route path="/detail_product/:id" element={<Detail_Product />} />
        {/* blogs */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/detail_blogs/:id" element={<Detail_blogs />} />
        <Route path="/contact" element={<Contact />} />
        {/* careers */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/detail_careers" element={<Detail_Careers />} />
        <Route path="/careers_apply" element={<Careers_Apply />} />

        {/* Admin Panel Routes */}
        <Route path="/panel_admin/admin/dashboardAdmin" element={<DashboardAdmin />} />
        {/* blogs admin */}
        <Route path="/panel_admin/admin/blog/blogsAdmin" element={<BlogsAdmin />} />
        <Route path="/panel_admin/admin/blog/detail_blog/:id" element={<Detail_Blog />} />
        <Route path="/panel_admin/admin/blog/edit_blog/:id" element={<Edit_Blog />} />

      </Routes>
    </Router>
  )
}

export default App
