import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturnType<T, Args extends any[]> = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  data: T | undefined;
  fn: (...args: Args) => Promise<void>;
};

const useFetch = <T, Args extends any[]>(
  callbackFunction: (...args: Args) => Promise<T>
): UseFetchReturnType<T, Args> => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  const fn = async (...args: Args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await callbackFunction(...args);
      setData(response);
      setError(null);
    } catch (error) {
      // Fix the type safety issue here
      const typedError = error instanceof Error 
        ? error 
        : new Error(typeof error === 'string' ? error : 'An error occurred');
      
      setError(typedError);
      toast.error(typedError.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, setLoading, error, data, fn };
};

export default useFetch;