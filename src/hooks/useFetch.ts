import { useEffect, useRef, useState } from "react";

type AsyncFunction = () => Promise<any[]>;
type State = {
  data: any[];
  isLoading: boolean;
  firstLoading: boolean;
};

export default function useFetch(
  asyncFunction: AsyncFunction,
  initialData: any[] = []
): {
  data: any[];
  isLoading: boolean;
  firstLoading: boolean;
  refreshData: () => void;
} {
  const isMounted = useRef<boolean>(false);
  const [state, setState] = useState<State>({
    data: initialData,
    isLoading: true,
    firstLoading: true,
  });

  const fetchData = (): void => {
    if (isMounted.current && !state.isLoading) {
      setState({
        ...state,
        isLoading: true,
      });
    }

    setTimeout(() => {
      asyncFunction()
        .then((response: any[]) => {
          if (isMounted.current) {
            let data = response;
            setState({
              data: data,
              isLoading: false,
              firstLoading: false,
            });
          }
        })
        .catch((_err: any) => {
          setState({
            data: [],
            isLoading: false,
            firstLoading: false,
          });
        });
    }, 300);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const refreshData = (): void => {
    fetchData();
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    firstLoading: state.firstLoading,
    refreshData,
  };
}
