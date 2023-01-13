import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [movieList, setMovieList] = useState("");
  

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error!");
          }
          return res.json();
        })
        .then((data) => {
          setMovieList(data.data);
        })
        .catch((err) => {
          console.log("err");
        });
    }, );
  }, [url]);
  return [movieList, setMovieList];
};

export default useFetch;
