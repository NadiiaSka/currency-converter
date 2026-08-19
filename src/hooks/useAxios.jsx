import axios from "axios";

const useAxios = () => {
  const fetchData = async (url, config = {}) => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return fetchData;
};

export default useAxios;
