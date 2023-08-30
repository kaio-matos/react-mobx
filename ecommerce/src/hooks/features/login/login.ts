import { useFetch } from "../../fetch";
import { CommerceService } from "../../../services";
import { User } from "../../../services/commerce/auth/resources/user";
import { useStore } from "../../../stores";

export const useLogin = (onLogin?: (user: User) => Promise<void> | void) => {
  const { Auth } = useStore();

  const { isLoading, execute: login } = useFetch(
    async (...args: Parameters<typeof CommerceService.Auth.login>) => {
      const data = await CommerceService.Auth.login(...args);

      await onLogin?.(data);

      Auth.setUser(data);
    },
    null
  );

  return {
    loading: {
      login: isLoading,
    },
    login,
  };
};
