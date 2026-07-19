// import { ApiResponseProfile } from "@/app/api/account/profile/[profileId]/route";
import {
  queryOptions,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteProfile, getProfile } from "../dal/profile";
import { getMyList } from "../dal/my-list/queries";
import type { ProfileMovieRating } from "../generated/prisma/client";

/* export const getProfile = async (
  profileId: ProfileMovieRating["profileId"]
) => {
  return await api<ApiResponseProfile>({
    path: `/api/account/profile/${profileId}`,
  });
};
 */
export const getProfileQueryOptions = (
  profileId: ProfileMovieRating["profileId"] | undefined | null,
) => {
  return queryOptions({
    queryKey: ["profile", profileId],
    queryFn: profileId
      ? () => getProfile({ data: { id: profileId } })
      : skipToken,
  });
};

export const useProfile = (...arg: Parameters<typeof getProfileQueryOptions>) =>
  useQuery(getProfileQueryOptions(...arg));

export const useProfileWithPreload = (
  profileId: ProfileMovieRating["profileId"] | undefined | null,
) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["profile", profileId],
    queryFn: profileId
      ? () => {
          queryClient.prefetchQuery({
            queryKey: ["mylist", profileId],
            queryFn: () => getMyList(),
          });
          return getProfile({ data: { id: profileId } });
        }
      : skipToken,
  });
};

export const useDeleteProfile = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: ({ profileId }: { profileId: number }) =>
      deleteProfile({ data: { id: profileId } }),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onSettled: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
