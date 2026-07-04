import { Ratings } from "~/components/profile/ratings";
import { getProfile } from "~/lib/dal/profile";
import { getRatings } from "~/lib/dal/ratings/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/account/profiles/$id/ratings/")({
  component: RatingsPage,
  loader: async ({ context, params }) => {
    const id = params.id;
    context.queryClient.prefetchInfiniteQuery({
      queryKey: ["ratings", Number(id)],
      queryFn: ({ pageParam }: { pageParam?: string }) => {
        return getRatings({
          data: { profileId: Number(id), take: 10, cursor: pageParam },
        });
      },
      initialPageParam: undefined,
    });

    const profile = await getProfile({ data: { id: Number(id) } });

    return profile;
  },
});

function RatingsPage() {
  const { profile, error } = Route.useLoaderData();
  if (error) return <div>{error.message}</div>;
  return (
    <div className="">
      <Ratings profile={profile} />
    </div>
  );
}
