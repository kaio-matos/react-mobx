import { useState } from "react";

export function useToggle(initial?: boolean) {
  const [state, setState] = useState(initial ?? false);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle] as const;
}
