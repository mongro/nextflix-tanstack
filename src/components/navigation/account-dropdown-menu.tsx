import {
  DropdownMenu,
  DropdownTrigger,
  MenuContent,
  MenuItem,
  MenuPortal,
} from "../ui/dropdown";
import { Button } from "../ui/button";
import { useSignOut } from "~/lib/auth/auth-client";
import Avatar from "../ui/avatar";
import { useNavigate } from "@tanstack/react-router";
import { Locale } from "~/i18n/config";
import { useDictionary } from "../provider/dictionary-provider";
import { Profile } from "~/lib/generated/prisma/client";

type AccountDropdownProps = {
  lang: Locale;
  profile: Profile | null | undefined;
};
export default function AccountDropdown({
  lang,
  profile,
}: AccountDropdownProps) {
  const navigate = useNavigate();
  const signout = useSignOut(() => navigate({ from: "/$lang", to: "/$lang" }));
  const { dictionary } = useDictionary();

  return (
    <DropdownMenu label="account">
      <DropdownTrigger asChild>
        <Button>
          <Avatar
            alt="profilePicure"
            className="size-8"
            src={profile?.avatar}
            width="512"
            height="512"
          />
        </Button>
      </DropdownTrigger>
      <MenuPortal>
        <MenuContent>
          <MenuItem
            label="profiles information"
            onClick={() =>
              navigate({ to: "./account/profiles", from: "/$lang" })
            }
          >
            {dictionary.buttons.manageProfiles}
          </MenuItem>
          <MenuItem
            label="manage profile"
            onClick={() =>
              navigate({ to: "./account/profile-select", from: "/$lang" })
            }
          >
            {dictionary.buttons.switchProfile}
          </MenuItem>
          <MenuItem
            label="Sign Out"
            onClick={() => {
              signout.mutate();
            }}
          >
            {dictionary.buttons.signOut}
          </MenuItem>
        </MenuContent>
      </MenuPortal>
    </DropdownMenu>
  );
}
