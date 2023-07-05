interface UseRepositoryData<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  updateData: () => Promise<void>;
}

export class ErrorGetDataRespository extends Error {}

// export const useRepositoryData = <T>(
//   repository: IRepository<T>
// ): UseRepositoryData<T> => {
//   const [data, setData] = useState<T[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<ErrorGetDataRespository | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, [repository]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const newData = await repository.getAll();

//       setData(newData);
//       setError(null);
//     } catch (err) {
//       setError(err as ErrorGetDataRespository);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, updateData: fetchData };
// };
