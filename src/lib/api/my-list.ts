import {
  queryOptions,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
/* import { ApiResponseIsInMyList } from "@/app/api/account/profile/[profileId]/mylist/[movieId]/route";
import { ApiResponseListOfProfile } from "@/app/api/account/profile/[profileId]/mylist/route"; */
import { useServerFn } from "@tanstack/react-start";
import { addToMyList, removeFromMyList } from "../dal/my-list/actions";
import { getMyList, isInMyList } from "../dal/my-list/queries";
import type { ProfileMovie } from "../generated/prisma/client";

export const MY_LIST_QUERYKEY = "mylist";

/* const isInMyList = async (
  profileId: ProfileMovie["profileId"],
  movieId: ProfileMovie["movieId"]
) => {
  return await api<ApiResponseIsInMyList>({
    path: `/api/account/profile/${profileId}/mylist/${movieId}`,
  });
}; */
/* export const getMyList = async (profileId: ProfileMovie["profileId"]) => {
  return await api<ApiResponseListOfProfile>({
    path: `/api/account/profile/${profileId}/mylist`,
  });
}; */

export const isInMyListQueryOptions = (
  profileId: ProfileMovie["profileId"] | undefined | null,
  movieId: ProfileMovie["movieId"],
) => {
  // const getIsInMyList = useServerFn(isInMyList);
  return queryOptions({
    queryKey: [MY_LIST_QUERYKEY, profileId, movieId],
    queryFn: profileId
      ? () => isInMyList({ data: { profileId, movieId } })
      : skipToken,
  });
};

export const getMyListQueryOptions = (
  profileId: ProfileMovie["profileId"] | undefined | null,
) => {
  return queryOptions({
    queryKey: [MY_LIST_QUERYKEY, profileId],
    queryFn: profileId ? () => getMyList() : skipToken,
  });
};

export function useMyList(...arg: Parameters<typeof getMyListQueryOptions>) {
  return useQuery(getMyListQueryOptions(...arg));
}

export function useIsInMyList(
  profileId: ProfileMovie["profileId"],
  movieId: ProfileMovie["movieId"],
) {
  const isInMyListServerFn = useServerFn(isInMyList);

  const isInMyListQueryOptions = queryOptions({
    queryKey: [MY_LIST_QUERYKEY, profileId, movieId],
    queryFn: profileId
      ? () => isInMyListServerFn({ data: { profileId, movieId } })
      : skipToken,
  });

  const queryClient = useQueryClient();
  return useQuery({
    ...isInMyListQueryOptions,
    initialData: () => {
      const myList = queryClient.getQueryData(
        getMyListQueryOptions(profileId).queryKey,
      );
      return myList?.some((item) => item.movieId === movieId);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(getMyListQueryOptions(profileId).queryKey)
        ?.dataUpdatedAt,
  });
}

export const useToggleMyList = (
  isInMyList: boolean,
  onSuccess?: (isInMyList: boolean) => void,
) => {
  return useMutation({
    mutationFn: ({
      profileId,
      movieId,
    }: Pick<ProfileMovie, "profileId" | "movieId">) => {
      return !isInMyList
        ? addToMyList({ data: { profileId, movieId } })
        : removeFromMyList({ data: { profileId, movieId } });
    },
    onMutate: async ({ profileId, movieId }, context) => {
      const queryKey = isInMyListQueryOptions(profileId, movieId).queryKey;

      await context.client.cancelQueries({ queryKey });
      const previousIsInMyList = context.client.getQueryData(queryKey);
      context.client.setQueryData(queryKey, !isInMyList);
      return { previousIsInMyList };
    },
    onSettled: (data, err, { profileId, movieId }, mutateResult, context) => {
      const queryKey = isInMyListQueryOptions(profileId, movieId).queryKey;
      if (!data?.success || err) {
        context.client.setQueryData(queryKey, mutateResult?.previousIsInMyList);
      } else if (onSuccess) {
        const isInMyList = context.client.getQueryData(queryKey);
        onSuccess(Boolean(isInMyList));
      }
    },
  });
};
