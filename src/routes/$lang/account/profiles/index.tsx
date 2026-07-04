import { createFileRoute } from "@tanstack/react-router";
import { CreateProfileDialog } from "~/components/profile/create-profile-dialog";
import { Profiles } from "~/components/profile/profiles";
import { getAllProfilesOfUser } from "~/lib/dal/profile";

export const Route = createFileRoute("/$lang/account/profiles/")({
  component: ProfilesPage,
  loader: async () => {
    return await getAllProfilesOfUser();
  },
});

function ProfilesPage() {
  const profiles = Route.useLoaderData();

  return (
    <div className="">
      <h1 className="text-2xl mb-4">Profile Settings</h1>
      <div>
        Select the profile you want to change settings for or create a new
        profile.
      </div>
      <Profiles profiles={profiles} />
      <div className="mt-4">
        <CreateProfileDialog />
      </div>
    </div>
  );
}
