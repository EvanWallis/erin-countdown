import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Erin Countdown",
    short_name: "Erin Countdown",
    description: "A shared countdown to March 22, 2026 in Eastern Time.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fef8f1",
    theme_color: "#d86f4a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
