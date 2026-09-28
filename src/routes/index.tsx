import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
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

function Index() {
  return (
    <iframe
      src="/site/index.html"
      title="SozialhilfeInfo"
      className="block h-screen w-full border-0"
    />
  );
}
