import { t as getMyList } from "./queries-D8MsY7a9.js";
import { i as getProfile, n as deleteProfile } from "./profile-DWMdx_pb.js";
import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/lib/api/profile.ts
var useProfileWithPreload = (profileId) => {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ["profile", profileId],
		queryFn: profileId ? () => {
			queryClient.prefetchQuery({
				queryKey: ["mylist", profileId],
				queryFn: () => getMyList()
			});
			return getProfile({ data: { id: profileId } });
		} : skipToken
	});
};
var useDeleteProfile = (onSuccess) => {
	return useMutation({
		mutationFn: ({ profileId }) => deleteProfile({ data: { id: profileId } }),
		onSuccess: () => {
			console.log("onSuccess");
			if (onSuccess) onSuccess();
		},
		onSettled: () => {
			console.log("onSettled");
			if (onSuccess) onSuccess();
		},
		onError: () => {
			console.log("onError");
			if (onSuccess) onSuccess();
		}
	});
};
//#endregion
export { useProfileWithPreload as n, useDeleteProfile as t };
