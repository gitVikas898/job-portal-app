import { useSession } from "@clerk/clerk-react"
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const { session } = useSession();

  const [data, setdata] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
     const response = await cb(supabaseAccessToken,options,...args)
     setdata(response);
     setError(null);
    } catch (error) {
        setError(error);
    }finally{
        setLoading(false);
    }
  };
  return {fn,data,loading,error}
};

export default useFetch;
