import { observer } from "mobx-react-lite";
import { useMountFetch } from "../../hooks/fetch";
import { CommerceService } from "../../services";
import { Product } from "../../services/commerce/products/resources/product";

function useProducts() {
  const {
    state: { products, ...extra },
    error: productsErrors,
    execute: indexProducts,
    isLoading: isLoadingProducts,
  } = useMountFetch(
    CommerceService.Products.index.bind(CommerceService.Products),
    {
      products: [],
      limit: 0,
      skip: 0,
      total: 0,
    }
  );

  return { products, extra, indexProducts, isLoadingProducts, productsErrors };
}

export const ProductCard = observer(function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="flex flex-col bg-slate-400 rounded" key={product.id}>
      <header>
        <img
          className="object-cover w-full h-80 mx-auto rounded"
          src={product.images[0]}
        />
        <div className="flex p-4 justify-between">
          <h1 className="font-bold text-3xl">{product.title}</h1>

          <span className="text-xl my-auto">{product.formattedPrice}</span>
        </div>
      </header>

      <p className="text-center p-4">{product.description}</p>

      <footer className="flex gap-3 px-4 pb-4 mt-auto">
        <button className="bg-blue-400 hover:bg-blue-600 disabled:bg-slate-400 text-white px-4 py-3 rounded transition">
          Add to cart
        </button>
        <button className="bg-blue-400 hover:bg-blue-600 disabled:bg-slate-400 text-white px-4 py-3 rounded transition">
          Favorite
        </button>
      </footer>
    </article>
  );
});

export const Products = observer(function Products() {
  const { products, isLoadingProducts } = useProducts();

  return (
    <div className="p-8">
      {isLoadingProducts && <b>Loading Products...</b>}
      <div className="grid grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
});
