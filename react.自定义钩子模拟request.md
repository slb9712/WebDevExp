```js
const useRequest = (url, data) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});
    const request = async () => {
        const res = await axios({
            url,
            params:data,
        })
        // requestApi(url)
        if (res) {
            setResult(result);
        } 
        // ...
    }
    useEffect(() => {
        request();
    }, [])
    return {
        loading,
        result,
        // ...
    }
}

const useRequest = (url, data, config) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const request = async () => {
    setLoading(true);
    try {
      const result = await axios({
        url,
        params: data,
        method: 'get',
      });
      if (result && result.status >= 200 && result.status <= 304) {
        setResult(result.data);
      } else {
        setError(new Error('get data error in useRequest'));
      }
    } catch (reason) {
      setError(reason);
    }
    setLoading(false);
  };
  useEffect(() => {
    request();
  }, []);

  return {
    loading,
    result,
    error,
  };
};

```