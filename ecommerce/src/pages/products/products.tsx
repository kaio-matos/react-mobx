import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { useProducts } from "./hooks/useProducts";
import { ProductCard } from "./product.card";

export const Products = observer(function Products() {
  const { products, isLoadingProducts } = useProducts();
  const { Auth } = useStore();

  return (
    <div className="p-8">
      {isLoadingProducts && <b>Loading Products...</b>}

      <div className="grid grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard product={product} user={Auth.user} key={product.id} />
        ))}
      </div>
    </div>
  );
});
