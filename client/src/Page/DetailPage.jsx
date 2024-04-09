import DetailProduct from "../Component/DetailProduct";
import RelatedProduct from "../Component/RelatedProduct";

export default function DetailPage({ data }) {
  return (
    <div>
      <DetailProduct></DetailProduct>
      <RelatedProduct></RelatedProduct>
    </div>
  );
}
