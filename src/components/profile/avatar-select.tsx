import { avatarImages } from "@/public/avatars";
import Avatar from "../ui/avatar";

type AvatarSelectProps = {
  onSelect: (avatar: string) => void;
};

export function AvatarSelect({ onSelect }: AvatarSelectProps) {
  return (
    <div className="p-4 border-2 rounded mt-4">
      <div className="flex gap-2">
        {avatarImages.map((avatar) => {
          return (
            <button
              key={avatar}
              className="p-2 hover:bg-accent/50 "
              onClick={() => onSelect(avatar)}
            >
              <Avatar
                src={avatar}
                className="w-24 md:w-44"
                alt="avatar"
                width={512}
                height={512}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
