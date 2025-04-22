import fs from "node:fs/promises";
import path from "node:path";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import * as React from "react";

export const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const fontMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400"],
});

export const getSansRegular = React.cache(async () => {
  return await fs.readFile(
    path.join(process.cwd(), "assets/fonts/Inter-Regular.ttf"),
  );
});
