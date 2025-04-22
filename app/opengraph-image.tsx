import { getSansRegular } from "@/assets/fonts";
import { LogoIcon } from "@/components/icons";
import { SITE_CONFIG } from "@/lib/constants";
import { ImageResponse } from "next/og";

export const alt = SITE_CONFIG.NAME;
export const size = {
  width: SITE_CONFIG.OG_IMAGE.WIDTH,
  height: SITE_CONFIG.OG_IMAGE.HEIGHT,
};

export const contentType = SITE_CONFIG.OG_IMAGE.TYPE;

export default async function Image() {
  const sansRegular = await getSansRegular();

  return new ImageResponse(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <LogoIcon style={{ width: "auto", height: "32px" }} />

        <span
          style={{
            fontSize: "3.5rem",
            lineHeight: 1,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          {SITE_CONFIG.DESCRIPTION}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: sansRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
