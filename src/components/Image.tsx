import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

// 🔹 Define Shift Animation Keyframes
const Img = styled("img")`
  @keyframes materialize {
    0% {
      filter: saturate(20%) contrast(50%) brightness(120%);
    }
    75% {
      filter: saturate(60%) contrast(100%) brightness(100%);
    }
    100% {
      filter: saturate(100%) contrast(100%) brightness(100%);
    }
  }
`;

// 🔹 TypeScript Props for MuiImage
interface ImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  showLoading?: boolean;
  errorIcon?: boolean;
  shift?: "top" | "bottom" | "left" | "right" | false;
  distance?: number; // ✅ Distance the image shifts before settling
  shiftDuration?: number;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>; // ✅ Supports MUI sx prop for styling
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  width = "100%",
  height = "100%",
  objectFit = "cover",
  showLoading = false,
  errorIcon = true,
  shift = false,
  distance = 50, // ✅ Default shift distance
  shiftDuration = 300,
  style = {},
  sx = {}, // ✅ Accepts sx prop
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // ✅ Handles Shift Animations with Distance Control
  const shiftStyles: React.CSSProperties = shift
    ? {
        transform: loaded
          ? "translate(0,0)"
          : shift === "top"
          ? `translateY(-${distance}px)`
          : shift === "bottom"
          ? `translateY(${distance}px)`
          : shift === "left"
          ? `translateX(-${distance}px)`
          : `translateX(${distance}px)`, // shift === "right"
        transition: `transform ${shiftDuration}ms ease-out, opacity 300ms ease-in-out`,
      }
    : {};

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* ✅ Show Loading Indicator */}
      {!loaded && showLoading && <CircularProgress size={40} />}

      {/* ✅ Display Image with Shift & Error Handling */}
      <Img
        src={error ? "https://via.placeholder.com/150" : src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          opacity: loaded ? 1 : 0,
          animation: loaded ? `materialize 600ms ease-in-out` : "none",
          ...shiftStyles, // ✅ Apply shift styles dynamically
          ...style, // ✅ Allow custom styles to be passed
        }}
        sx={sx} // ✅ Apply MUI sx prop
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Image;
