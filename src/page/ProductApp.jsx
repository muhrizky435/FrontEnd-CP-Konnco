import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function ProductApp() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/products");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />

      <main className="flex-1 w-full pt-4 pb-10 px-2 md:px-0">
        <section className="w-full mx-auto px-4 md:px-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-6"
          >
            <div className="text-[#E86A1C] font-semibold text-2xl mb-2">
              Our Products
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Konnco Products
            </h1>
            <div className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto text-center">
              Setiap produk dirancang dengan fokus pada kemudahan penggunaan,
              keandalan, dan nilai fungsional yang tinggi.
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className={`flex flex-col md:flex-row items-stretch md:min-h-[360px] md:h-[360px] rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.4)] overflow-hidden bg-white text-justify
                ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-full">
                  <img
                    src={product.mainPhoto ? product.mainPhoto : "/default-image.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8 md:h-full">
                  <div className="flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-black">
                      {product.title}
                    </h2>
                    <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 line-clamp-4">
                      {product.description}
                    </div>
                  </div>
                  <a
                    href={`detail_product/${product.id}`}
                    className="group flex gap-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-[5px_5px_20px_rgba(0,0,0,0.4)] w-fit transition"
                  >
                    Lihat Detail
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <KonncoFooter
        fadeUp={fadeUp}
        footerRef={footerRef}
        footerInView={footerInView}
        logoWhite={logoWhite}
        logoEmail={logoEmail}
        logoFB={logoFB}
        logoIG={logoIG}
        logoLink={logoLink}
        logoTiktok={logoTiktok}
      />
    </div>
  );
}

void motion;

export default ProductApp;
