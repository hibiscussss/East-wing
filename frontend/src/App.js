
import "./App.css";
import { Routes, Route, useLocation  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin/index";
import Signup from "./pages/Auth/Signup/index";
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail/index";
import Basket from "./pages/Basket/index";
import Error404 from "./pages/Error404/index";
import ProductedProfile from "./pages/ProductedRoute/ProductedProfile";
import ProductedAdmin from "./pages/ProductedRoute/ProductedAdmin";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import Testi from "./components/Testi/Testi";
import Map from "./components/map/Map";
import NewProduct from "./pages/Products/New";
import Footer from "./components/Footer";
import "./App.css";

import HomeSlider from "./Homepage/HomeSlider";




function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div id="content">
      <div className="appBackground">
      {/* Other components, including your Card component */}
 {/* Footer will only show on homepage (/) or product list (/product-list) */}
 {(location.pathname === '/' || location.pathname === '/product-list') && <HomeSlider />}
 
        <Routes>
   
          <Route path="/" exect index element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<ProductedProfile />} />
          <Route path="/admin">
            <Route index element={<ProductedAdmin />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path=":product_id" element={<AdminProductDetail />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
       
        </Routes>
        {(location.pathname === '/' || location.pathname === '/product-list') && <Testi />}
        {(location.pathname === '/' || location.pathname === '/product-list') && <Map />}
        {(location.pathname === '/' || location.pathname === '/product-list') && <Footer />}
        
    
        </div>
   
  
     

 
      </div>
      
    </>
  );
}

export default App;
