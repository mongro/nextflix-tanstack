import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

interface AvatarProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src"
> {
  src: string | undefined;
}

const Avatar = (props: AvatarProps) => {
  const { src, className, alt, ...rest } = props;
  const [showFallback, setShowFallback] = useState(false);
  return !showFallback && src ? (
    <img
      src={src}
      alt={alt}
      className={className}
      width={256}
      height={256}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw,20vw"
      onError={() => {
        setShowFallback(true);
      }}
      {...rest}
    />
  ) : (
    <UserIcon className={className} />
  );
};

export default Avatar;
