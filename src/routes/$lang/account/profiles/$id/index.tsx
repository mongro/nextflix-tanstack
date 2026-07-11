import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ProfileSettings } from "~/components/profile/profile-settings";
import { getProfile } from "~/lib/dal/profile";

export const Route = createFileRoute("/$lang/account/profiles/$id/")({
  component: Page,
  loader: async ({ params }) => {
    return await getProfile({ data: { id: Number(params.id) } });
  },
});

function Page() {
  const { profile, error } = Route.useLoaderData();

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div className="flex items-center gap-8 mb-8 font-bold">
        <Link from={"/$lang"} to={"/$lang/account/profiles"}>
          <ArrowLeftIcon className="size-6" />
        </Link>
        <h1 className="text-2xl">{`Settings for ${profile.name}`}</h1>
      </div>
      <ProfileSettings profile={profile} />
    </div>
  );
}
