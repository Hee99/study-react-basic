import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.',
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (params) => {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: params,
        });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [config, sendRequest]);

  return {
    loading,
    error,
    data,
    clearData,
    sendRequest,
  };
}
