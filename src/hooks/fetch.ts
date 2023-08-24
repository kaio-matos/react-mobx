import { useEffect, useRef, useState } from "react";

export function useMountFetch<T>(cb: () => Promise<T>, initial: T) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initial);
  const [error, setError] = useState<unknown>(null);
  const shouldRun = useRef(true);

  const execute = async () => {
    setIsLoading(true);

    try {
      const data = await cb();
      setState(data);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!shouldRun.current) return;

    execute();

    return () => {
      shouldRun.current = false;
    };
  });

  return {
    isLoading,
    setIsLoading,
    state,
    error,
    setError,
    execute,
  };
}

type Fn = (...args: any[]) => any;

export function useFetch<T extends Fn, C>(cb: T, initial: C) {
  type State = Awaited<ReturnType<T>>;

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<State | C>(initial);
  const [error, setError] = useState<unknown>(null);

  async function execute(...args: Parameters<T>): Promise<State | undefined> {
    try {
      const data = await cb(...args);
      setState(data);
      return data;
    } catch (err) {
      setError(err);
    }
  }

  return {
    isLoading,
    setIsLoading,
    state,
    setState,
    error,
    setError,
    execute,
  };
}
