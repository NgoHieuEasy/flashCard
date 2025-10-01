// import apiClient from "@/axios";
// import { netWorkConfig } from "@/interfaces/axios";
// import { LOGOUT_REQUIRED } from "@/utils/constants";
// import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
// import { AxiosError, AxiosResponse } from "axios";
// import { useMemo } from "react";

// const fetchInventory = async ({
//     queryKey,
//   }: QueryFunctionContext): Promise<IInventoryData> => {
//     try {
//       const [, page, limit] = queryKey;
//       const url = [`/inventory?page=${page}&limit=${limit}`].join("");

//       const response: AxiosResponse<IInventoryData> = await apiClient.get(url);
//       return response.data;
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (
//           error.response?.status === 401 &&
//           error.response?.data?.action === LOGOUT_REQUIRED
//         ) {
//           throw {
//             error: "Login session has expired.",
//             action: LOGOUT_REQUIRED,
//           } as IAuthError;
//         }
//       }
//       throw error;
//     }
//   };

//   export function useInventory({ page, limit }: IPaginationParams) {
//     const { data, isLoading, error, isFetching, } = useQuery<
//       IInventoryData,
//       { error: string; action: string }
//     >(["get-inventory", page, limit], fetchInventory, netWorkConfig);

//     const isEmpty = Array.isArray(data?.results) ? data.results.length === 0 : !data;
//     const formattedError = useMemo(() => {
//       if (error?.action === LOGOUT_REQUIRED) {
//         return {
//           error: "Login session has expired.",
//           action: LOGOUT_REQUIRED,
//         };
//       }
//       return error
//         ? { error: "Error loading inventory info.", action: "UNKNOWN_ERROR" }
//         : null;
//     }, [error]);
//     const memoizedValue = useMemo(
//       () => ({
//         inventory: data,
//         inVenLoading: isLoading,
//         inVenFetching: isFetching,
//         inVenError: formattedError,
//         inVenEmpty: isEmpty,
//       }),
//       [data, isLoading, error, isEmpty, isFetching]
//     );

//     return memoizedValue;
//   }
