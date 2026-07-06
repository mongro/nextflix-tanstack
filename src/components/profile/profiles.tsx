import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Avatar from "../ui/avatar";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Profile } from "@/lib/generated/prisma/client";
import { useSession } from "~/lib/auth/auth-client";

type ProfilesProps = {
  profiles: Profile[];
};
export function Profiles({ profiles }: ProfilesProps) {
  const session = useSession();

  return (
    <div className="p-4 border-2 rounded mt-4">
      <ul>
        {profiles.map((profile: Profile) => {
          return (
            <li key={profile.name} className="border-b-2">
              <Link
                from="/$lang"
                to="/$lang/account/profiles/$id"
                params={({ lang }) => ({ lang, id: profile.id + "" })}
                className="p-4 hover:bg-accent/50 block"
              >
                <div className="flex items-center gap-4">
                  <Avatar
                    src={profile.avatar}
                    alt="avatar"
                    className="size-12"
                  />
                  <div className="text-lg font-bold grow">{profile.name}</div>
                  {profile.id ===
                    session.data?.data?.session.selectedProfileId && (
                    <div className="text-sm flex items-center justify-center ">
                      Your Profile
                    </div>
                  )}
                  <ChevronRightIcon className="size-6 pl-2" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
