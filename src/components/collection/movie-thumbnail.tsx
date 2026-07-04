import { useCallback } from "react";

import Thumbnail, { ThumbnailProps } from "./thumbnail";
import { MediaType, getMediaType } from "~/lib/tmdb/requests";
import { ModalOptions, useModalContext } from "../provider/modal-provider";

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
