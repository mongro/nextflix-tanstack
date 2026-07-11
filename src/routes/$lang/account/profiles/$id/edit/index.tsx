import { createFileRoute } from "@tanstack/react-router";
import { UpdateProfileForm } from "~/components/profile/update-profile-form";
import { getProfile } from "~/lib/dal/profile";

export const Route = createFileRoute("/$lang/account/profiles/$id/edit/")({
  component: ProfileEdit,
  loader: async ({ context, params }) => {
    const profile = await getProfile({ data: { id: Number(params.id) } });

    return profile;
  },
});

function ProfileEdit() {
  const { profile, error } = Route.useLoaderData();

  if (error) return <div>{error.message}</div>;
  return (
    <div className="">
      <UpdateProfileForm profile={profile} />
    </div>
  );
}
