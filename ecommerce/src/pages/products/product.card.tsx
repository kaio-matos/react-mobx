import { observer } from "mobx-react-lite";
import { Product } from "../../services/commerce/products/resources/product";
import { User } from "../../services/commerce/auth/resources/user";
import { useAddCart } from "../../hooks/features/cart/cart";

export const ProductCardPublic = observer(function ProductCardPublic({
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

          <span className="text-xl my-auto">{product.price.formatted}</span>
        </div>
      </header>

      <p className="text-center p-4">{product.description}</p>
    </article>
  );
});

export const ProductCardAuth = observer(function ProductCardAuth({
  user,
  product,
}: {
  user: User;
  product: Product;
}) {
  const { addProductToCart } = useAddCart(user);

  return (
    <article className="flex flex-col bg-slate-400 rounded" key={product.id}>
      <header>
        <img
          className="object-cover w-full h-80 mx-auto rounded"
          src={product.images[0]}
        />
        <div className="flex p-4 justify-between">
          <h1 className="font-bold text-3xl">{product.title}</h1>

          <span className="text-xl my-auto">{product.price.formatted}</span>
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

export const ProductCard = observer(function ProductCard({
  user,
  product,
}: {
  user: User | null;
  product: Product;
}) {
  return user ? (
    <ProductCardAuth product={product} user={user} key={product.id} />
  ) : (
    <ProductCardPublic product={product} key={product.id} />
  );
});
