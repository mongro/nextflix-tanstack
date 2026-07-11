import { InformationCircleIcon, PlayIcon  } from "@heroicons/react/24/solid";

import { useModalContext } from "./provider/modal-provider";
import type { DictionaryButtons } from "../i18n/type";
import type { MediaType } from "~/lib/tmdb/requests";
import { Button } from "~/components/ui/button";

interface Props {
  dictionary: DictionaryButtons;
  id: number;
  type: MediaType;
}
export function PromotedButtons({ dictionary, id, type }: Props) {
  const modalContext = useModalContext();
  return (
    <div className="flex mt-4 gap-2">
      <Button variant="secondary" size="lg">
        <PlayIcon className="size-6" />
        {dictionary.play}
      </Button>
      <Button
        size="lg"
        onClick={() => modalContext.setBigModalQueryParam(`${type}-${id}`)}
      >
        <InformationCircleIcon className="size-6" />
        {dictionary.moreInfo}
      </Button>
    </div>
  );
}

export default PromotedButtons;
