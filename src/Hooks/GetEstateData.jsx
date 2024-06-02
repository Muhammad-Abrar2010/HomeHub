import useAxiosPublic from "./Axios/useAxiosPublic";
import { useEffect, useState } from "react";

const GetEstateData = () => {
  const axiosPublic = useAxiosPublic();
  const [estates, setEstates] = useState([]);
  useEffect(() => {

    axiosPublic
      .get("/estates")
      .then((response) => {
        const limitedEstates = response.data;
        setEstates(limitedEstates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosPublic]);

  return estates;
};

export default GetEstateData;
