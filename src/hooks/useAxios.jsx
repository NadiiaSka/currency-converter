import axios from "axios";

const useAxios = () => {
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return fetchData;
};

export default useAxios;
