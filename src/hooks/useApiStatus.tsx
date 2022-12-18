import { useQuery } from "react-query";

const fetchApiStatus = async () => {
  const url = `/api`;
  const response = await fetch(url);
  const data = await response.json();
  console.info({ fetchApiStatus: data });
  console.info("----------------");
  const status: string = data?.status;
  return status;
};

const useApiStatus = () => {
  return useQuery(["status"], () => fetchApiStatus());
};

export default useApiStatus;
