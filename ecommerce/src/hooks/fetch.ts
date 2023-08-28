import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { TReturnCreateError, createError } from "../utils/error";

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
      setIsLoading(false);
      return data;
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

export function useFetch<T extends Fn, C, Schema extends z.AnyZodObject>(
  cb: T,
  initial: C,
  schema?: Schema
) {
  type State = Awaited<ReturnType<T>>;

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<State | C>(initial);
  const [error, setError] = useState<TReturnCreateError<Schema>>(
    createError<Schema>(null)
  );

  async function execute(...args: Parameters<T>): Promise<State | undefined> {
    setIsLoading(true);
    try {
      schema?.parse(args[0]);
      const data = await cb(...args);
      setState(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(createError<Schema>(err));
    }
    setIsLoading(false);
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
