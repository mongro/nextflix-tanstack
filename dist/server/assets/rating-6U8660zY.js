import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
import { infiniteQueryOptions, queryOptions, skipToken, useMutation, useQuery } from "@tanstack/react-query";
//#region src/lib/dal/ratings/actions.ts
var removeRating = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ed985b1c3092c243c7ddfc46d395db8b7cf639f9bead261e7e7f10f0155eb0de"));
var giveRating = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d57a3d9c09b32f47cf7f004d82e31e7a25b6ba2d0669bed754bc1878f4e2c64c"));
//#endregion
//#region src/lib/dal/ratings/queries.ts
var getRating = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("025481635efa9ab7f4a35e8ff5cd0721c6a4b4e310d9303839f352e0f218c35d"));
var getRatings = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("f52c3f80df2d1e20bc056500cca0337293f201d6bb1bc27b2341d18baa3747bb"));
//#endregion
//#region src/lib/api/rating.ts
var ratingQueryKey = "rating";
var getRatingQueryOptions = (profileId, movieId) => {
	return queryOptions({
		queryKey: [
			ratingQueryKey,
			profileId,
			movieId
		],
		queryFn: profileId ? () => getRating({ data: {
			profileId,
			externalMovieId: movieId
		} }) : skipToken
	});
};
var getInfiniteRatingsQueryOptions = (profileId, take) => {
	return infiniteQueryOptions({
		queryKey: ["ratings", profileId],
		queryFn: ({ pageParam }) => {
			console.log("pageParam in queryFn:", pageParam);
			return getRatings({ data: {
				profileId,
				cursor: pageParam,
				take
			} });
		},
		getNextPageParam: (lastPage) => {
			console.log("lastPage in getNextPageParam:", lastPage);
			return lastPage && lastPage?.length > take - 1 ? lastPage?.[lastPage?.length - 1]?.movieId : void 0;
		},
		initialPageParam: void 0
	});
};
var useRating = (...arg) => useQuery(getRatingQueryOptions(...arg));
var useGiveRating = () => {
	return useMutation({
		mutationFn: ({ profileId, movieId, rating }) => giveRating({ data: {
			profileId,
			movieId,
			rating
		} }),
		onMutate: async ({ profileId, movieId, rating }, context) => {
			const queryKey = getRatingQueryOptions(profileId, movieId).queryKey;
			await context.client.cancelQueries({ queryKey });
			console.log("cancelQueryKey", queryKey);
			const previousRating = context.client.getQueryData(queryKey);
			context.client.setQueryData(queryKey, previousRating ? {
				...previousRating,
				rating
			} : {
				profileId,
				movieId,
				rating,
				ratedAt: new Date(Date.now()),
				updatedAt: new Date(Date.now())
			});
			return { previousRating };
		},
		onError: (err, { profileId, movieId }, previousRating, context) => {
			context.client.setQueryData(getRatingQueryOptions(profileId, movieId).queryKey, previousRating?.previousRating);
		}
	});
};
var useRemoveRating = () => {
	return useMutation({
		mutationFn: ({ profileId, movieId }) => removeRating({ data: {
			profileId,
			movieId
		} }),
		onMutate: async ({ profileId, movieId }, context) => {
			const queryKey = getRatingQueryOptions(profileId, movieId).queryKey;
			await context.client.cancelQueries({ queryKey });
			const previousRating = context.client.getQueryData(queryKey);
			context.client.setQueryData(queryKey, null);
			return { previousRating };
		},
		onError: (err, { profileId, movieId }, previousRating, context) => {
			context.client.setQueryData(getRatingQueryOptions(profileId, movieId).queryKey, previousRating?.previousRating);
		}
	});
};
var useGiveRatingInInfiniteContext = () => {
	return useMutation({
		mutationFn: ({ profileId, movieId, rating }) => giveRating({ data: {
			profileId,
			movieId,
			rating
		} }),
		onMutate: async ({ profileId, movieId, rating }, context) => {
			const queryKey = getInfiniteRatingsQueryOptions(profileId, 10).queryKey;
			await context.client.cancelQueries({ queryKey });
			context.client.setQueryData(queryKey, (oldData) => {
				if (!oldData) return void 0;
				const newData = oldData.pages.map((page) => {
					return page.map((item) => {
						if (item.movieId === movieId && item.profileId == profileId) return {
							...item,
							rating
						};
						else return item;
					});
				});
				return {
					...oldData,
					pages: newData
				};
			});
			return { previousRating: context.client.getQueryData(queryKey) };
		},
		onError: (err, { profileId, movieId }, previousRating, context) => {
			const queryKey = getInfiniteRatingsQueryOptions(profileId, 10).queryKey;
			context.client.setQueryData(queryKey, previousRating?.previousRating);
		},
		onSettled: (data, error, { profileId, movieId }, prev, context) => {
			const queryKey = getRatingQueryOptions(profileId, movieId).queryKey;
			context.client.invalidateQueries({ queryKey });
		}
	});
};
var useRemoveRatingInInfiniteContext = () => {
	return useMutation({
		mutationFn: ({ profileId, movieId }) => removeRating({ data: {
			profileId,
			movieId
		} }),
		onMutate: async ({ profileId, movieId }, context) => {
			const queryKey = getInfiniteRatingsQueryOptions(profileId, 10).queryKey;
			await context.client.cancelQueries({ queryKey });
			const previousRating = context.client.getQueryData(queryKey);
			context.client.setQueryData(queryKey, (oldData) => {
				if (!oldData) return void 0;
				const newData = oldData.pages.map((page) => {
					return page.filter((item) => !(item.movieId === movieId && item.profileId == profileId));
				});
				return {
					...oldData,
					pages: newData
				};
			});
			return { previousRating };
		},
		onError: (err, { profileId, movieId }, previousRating, context) => {
			const queryKey = getInfiniteRatingsQueryOptions(profileId, 10).queryKey;
			context.client.setQueryData(queryKey, previousRating?.previousRating);
		},
		onSettled: (data, error, { profileId, movieId }, prev, context) => {
			const queryKey = getRatingQueryOptions(profileId, movieId).queryKey;
			context.client.invalidateQueries({ queryKey });
		}
	});
};
//#endregion
export { useRemoveRating as a, useRating as i, useGiveRating as n, useRemoveRatingInInfiniteContext as o, useGiveRatingInInfiniteContext as r, getRatings as s, getInfiniteRatingsQueryOptions as t };
