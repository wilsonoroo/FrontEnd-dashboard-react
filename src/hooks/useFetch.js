import { useEffect, useRef, useState } from "react";

export default function useFetch(asyncFunction, initialData = []) {

  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    data: initialData,
    isLoading: true,
    firstLoading: true
  });

  const fetchData = () => {
    // OPCIONAL
    if (isMounted.current && !state.isLoading) {
      setState({
        ...state,
        isLoading: true
      });
    }

    setTimeout(() => {
      asyncFunction().then(async (response) => {
        if (isMounted.current ) {

          let data = response
          setState({
            data: data,
            isLoading: false,
            firstLoading: false
          });
        }
      }).catch((err) => {
        setState({
          data: [],
          isLoading: false,
          firstLoading: false
        });
      });
    }, 300);
  }

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return (() => {
      isMounted.current = false;
    });
  }, []);

  const refreshData = () => {
    // console.log("refreshData data" + asyncFunction)
    fetchData();
  };

  return ({
    data: state.data,
    isLoading: state.isLoading,
    firstLoading: state.firstLoading,
    refreshData
  });
}