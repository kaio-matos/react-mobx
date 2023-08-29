import { useMountFetch } from "../../hooks/fetch";
import { CommerceService } from "../../services";

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

export function Products() {
  const { products, isLoadingProducts } = useProducts();

  return (
    <div className="p-8">
      {isLoadingProducts && <b>Loading Products...</b>}
      <div className="grid grid-cols-4 gap-10">
        {products.map((product) => {
          return (
            <article
              className="flex flex-col bg-slate-400 rounded"
              key={product.id}
            >
              <header>
                <img
                  className="object-cover w-full h-80 mx-auto rounded"
                  src={product.images[0]}
                />
                <h1 className="p-4 text-center font-bold text-3xl">
                  {product.title}
                </h1>
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
        })}
      </div>
    </div>
  );
}
