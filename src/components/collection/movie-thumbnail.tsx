import { useCallback } from "react";

import { useModalContext } from "../provider/modal-provider";
import Thumbnail from "./thumbnail";
import type { ThumbnailProps } from "./thumbnail";
import type { MediaType} from "~/lib/tmdb/requests";
import type { ModalOptions} from "../provider/modal-provider";
import { getMediaType } from "~/lib/tmdb/requests";

export default function MovieThumbnail({
  options,
  ...thumbnailProps
}: { options?: Partial<ModalOptions> } & ThumbnailProps) {
  const { openSmallModal } = useModalContext();
  const { media, onHoverDelay } = thumbnailProps;

  const onHover = useCallback(
    (id: number, type: MediaType, thumbnail: HTMLDivElement) => {
      openSmallModal(`${type}-${id}`, thumbnail, options);
    },
    [],
  );

  return (
    <Thumbnail
      onHover={(thumbnail) => onHover(media.id, getMediaType(media), thumbnail)}
      {...thumbnailProps}
    />
  );
}
