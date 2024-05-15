import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
interface Config {
  axiosInstance: any; // Replace 'any' with the actual type of your Axios instance
  method: string;
  url: string;
  requestConfig?: Record<string, any>;
}

const useAxios = (config: Config) => {
  const { axiosInstance, method, url } = config;
  const [response, setResponse] = useState<any[] | any>([]); // Replace 'any[]' with the actual type of your response data
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<number>(0);

  const [requestConfig, setRequestConfig] = useState<AxiosRequestConfig>(
    config.requestConfig || ({} as AxiosRequestConfig),
  );

  const refetch = (newReqConfigParams: Object = {}) => {
    setRequestConfig({ ...requestConfig, ...newReqConfigParams });
    setLoading(true);

    setReload((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: controller.signal,
      })
        .then((res: AxiosResponse) => {
          console.log('useAxios Response:', res);
          setResponse(res.data);
        })
        .catch((err: AxiosError) => {
          console.log('useAxios Error:', err.message);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
    // useEffect cleanup function
    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return [response, error, loading, refetch] as const;
};

export default useAxios;
