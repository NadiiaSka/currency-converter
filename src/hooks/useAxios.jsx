import axios from "axios";
import { useEffect, useState } from "react";

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
