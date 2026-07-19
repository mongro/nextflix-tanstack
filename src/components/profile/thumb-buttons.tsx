import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import HandThumbDownIconOutline from "@heroicons/react/24/outline/HandThumbDownIcon";
import HandThumbUpIconOutline from "@heroicons/react/24/outline/HandThumbUpIcon";
import { useDictionary } from "../provider/dictionary-provider";
import { Button } from "../ui/button";
import type { ProfileMovieRating } from "@/lib/generated/prisma/client";
import {
  useGiveRatingInInfiniteContext,
  useRemoveRatingInInfiniteContext,
} from "~/lib/api/rating";

type Props = {
  rating: ProfileMovieRating;
};
export function ThumbsButtons(props: Props) {
  const { profileId, movieId, rating } = props.rating;
  const { mutate: giveRating } = useGiveRatingInInfiniteContext();
  const { mutate: removeRating } = useRemoveRatingInInfiniteContext();

  const { dictionary } = useDictionary();

  const handleThumbClick = (button: ProfileMovieRating["rating"]) => {
    if (rating === button) {
      removeRating({ movieId, profileId });
    } else {
      giveRating({ profileId, movieId, rating: button });
    }
  };

  return (
    <div className="flex items-center">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleThumbClick("UP")}
        aria-pressed={rating === "UP"}
        aria-label={dictionary.buttons.thumbsUp}
      >
        {rating === "UP" ? <HandThumbUpIcon /> : <HandThumbUpIconOutline />}
      </Button>
      <Button
        aria-label={dictionary.buttons.thumbsDown}
        aria-pressed={rating === "DOWN"}
        size="icon"
        variant="ghost"
        onClick={() => handleThumbClick("DOWN")}
      >
        {rating === "DOWN" ? (
          <HandThumbDownIcon />
        ) : (
          <HandThumbDownIconOutline />
        )}
      </Button>
    </div>
  );
}
