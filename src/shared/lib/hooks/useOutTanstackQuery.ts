import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

interface UseMyQueryProps<TData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
}

export const useOutTanstackQuery = <TData, TError>({
  queryKey,
  queryFn,
}: UseMyQueryProps<TData>) => {
  return useQuery<TData, TError>({ queryKey, queryFn });
};
