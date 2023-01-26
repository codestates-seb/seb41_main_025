import { useState, useEffect } from "react";

const useFetch = (url) => {
  //todo : loading, error 관련 페이지 작업하기
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error!");
          }
          return res.json();
        })
        .then((data) => {
          setData(data.data);
        })
        .catch((err) => {
          setError(err.msg);
          console.log("err");
        });
    });
  }, [url]);
  return [data, setData, loading, error];
};

export default useFetch;
