import React from "react";

const base_imageUrl = "https://image.tmdb.org/t/p";
const sizes = [92, 154, 185, 342, 500, 780];

const generateTmdbImageUrl = (imageUrl: string, width: number) => {
  const closestWidth = sizes.find((s) => s >= (width || 0)) || 500;
  return `${base_imageUrl}/w${closestWidth}${imageUrl}`;
};
const generateSrcSet = ({
  imageUrl,
  width,
}: {
  imageUrl: string;
  width: number;
}) => {
  return {
    url: generateTmdbImageUrl(imageUrl, width),
    srcset: sizes
      .map((s) => `${generateTmdbImageUrl(imageUrl, s)} ${s}w`)
      .join(", "),
  };
};

// eslint-disable-next-line react/display-name
const ImageWithTmdbUrl = React.forwardRef(
  ({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>, ref) => {
    const { url, srcset } = generateSrcSet({
      imageUrl: src || "",
      width: props.width as number,
    });

    const style: React.CSSProperties = {
      width: "100%",
      height: "100%",
      position: "absolute",
      inset: 0,
    };

    props.loading ||= "lazy";
    return <img {...props} src={url} srcSet={srcset} style={style} />;
  },
);

export default ImageWithTmdbUrl;
