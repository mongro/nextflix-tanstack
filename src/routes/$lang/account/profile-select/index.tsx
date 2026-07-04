import { createFileRoute } from "@tanstack/react-router";
import { ProfileSelect } from "~/components/profile/profile-select";
import { getAllProfilesOfUser } from "~/lib/dal/profile";

export const Route = createFileRoute("/$lang/account/profile-select/")({
  component: Page,
  loader: async () => {
    return await getAllProfilesOfUser();
  },
});

function Page() {
  const profiles = Route.useLoaderData();
  return (
    <div className="">
      <ProfileSelect profiles={profiles} />
    </div>
  );
}
