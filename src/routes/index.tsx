import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  head: () => ({
    meta: [
      { title: "SozialhilfeInfo – Rente und soziale Leistungen" },
      {
        name: "description",
        content:
          "Private Informationen zu Rente, Erwerbsminderung, Rehabilitation und Sozialhilfe in Deutschland.",
      },
      {
        property: "og:title",
        content: "SozialhilfeInfo – Rente und soziale Leistungen",
      },
      {
        property: "og:description",
        content:
          "Private Informationen zu Rente, Erwerbsminderung, Rehabilitation und Sozialhilfe in Deutschland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
