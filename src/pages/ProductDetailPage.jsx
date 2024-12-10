import ProductDescription from "../components/product/ProductDescription";
import ProductDetail from "../components/product/ProductDetail";
import ProductBestSeller from "../components/product/ProductBestSeller";
import Clients from "../components/home/Clients";

const ProductDetailPage = () => {
  return (
    <>
      <ProductDetail />
      <ProductDescription />
      <ProductBestSeller />
      <Clients />
    </>
  );
};

export default ProductDetailPage;
