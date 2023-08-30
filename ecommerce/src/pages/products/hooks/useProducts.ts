import { useMountFetch } from "../../../hooks/fetch";
import { CommerceService } from "../../../services";

export function useProducts() {
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
