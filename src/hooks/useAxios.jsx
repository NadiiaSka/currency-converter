import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(true);
        const response = await axios(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(false);
      }
    };
    fetchData();
  }, [url]);

  return [data, loaded, error];
};

export default useAxios;
