import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// 6-point snowflake drawn with three rotated bars + a center dot (no SVG/font,
// so Satori renders it reliably). Mirrors src/app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0e14",
        }}
      >
        <div style={{ position: "relative", display: "flex", width: 120, height: 120 }}>
          {[0, 60, 120].map((deg) => (
            <div
              key={deg}
              style={{
                position: "absolute",
                top: 54,
                left: 0,
                width: 120,
                height: 12,
                borderRadius: 6,
                backgroundColor: "#f4845f",
                transform: `rotate(${deg}deg)`,
                transformOrigin: "center",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: 51,
              left: 51,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#2ec4b6",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
