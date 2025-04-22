import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    >
      <svg
        data-logo="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 46 40"
        width={size.width * 0.7}
        height={size.height * 0.7}
      >
        <g id="logogram" transform="translate(0, 0) rotate(0)">
          <path
            d="M20.593 0.782715L46 26.1594V39.7827H34.1434V31.0567L15.69 12.6252H11.8566V39.7827H0V0.782715H20.593ZM34.1434 14.317V0.782715H46V14.317H34.1434Z"
            fill="#09090B"
          />
        </g>
        <g id="logotype" transform="translate(46, 20)" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
