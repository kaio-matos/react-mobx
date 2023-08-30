import { observer } from "mobx-react-lite";
import { useFetch, useMountFetch } from "../../hooks/fetch";
import { CommerceService } from "../../services";
import { Product } from "../../services/commerce/products/resources/product";
import { useStore } from "../../stores";
import { useEffect } from "react";

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

function useCart(userId: number) {
  const { Carts } = useStore();

  const {
    state: cart,
    error: cartErrors,
    execute: addProductToCart,
    isLoading: isAddingProductToCart,
  } = useFetch((product_id: number) => {
    const payload = {
      userId,
      products: [{ id: product_id, quantity: 1 }],
    };

    if (Carts.carts.length) {
      CommerceService.Carts.update_schema.parse(payload);
      return CommerceService.Carts.update(1, {
        products: payload.products,
        merge: true,
      });
    }

    CommerceService.Carts.add_schema.parse(payload);
    return CommerceService.Carts.add(payload);
  }, null);

  useEffect(() => {
    if (cart) Carts.addCart(cart);
  }, [cart]);

  return { cart, cartErrors, addProductToCart, isAddingProductToCart };
}

export const ProductCardPublic = observer(function ProductCard({
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
    </article>
  );
});

export const ProductCardAuth = observer(function ProductCard({
  userId,
  product,
}: {
  userId: number;
  product: Product;
}) {
  const { addProductToCart } = useCart(userId);

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
        <button
          className="bg-blue-400 hover:bg-blue-600 disabled:bg-slate-400 text-white px-4 py-3 rounded transition"
          onClick={() => addProductToCart(product.id)}
        >
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
  const { Auth } = useStore();

  return (
    <div className="p-8">
      {isLoadingProducts && <b>Loading Products...</b>}
      <div className="grid grid-cols-4 gap-10">
        {products.map((product) =>
          Auth.user ? (
            <ProductCardAuth
              product={product}
              userId={Auth.user.id}
              key={product.id}
            />
          ) : (
            <ProductCardPublic product={product} key={product.id} />
          )
        )}
      </div>
    </div>
  );
});
