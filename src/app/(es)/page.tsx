import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Diseño y desarrollo web para empresas",
  description:
    "NOVARY diseña y desarrolla experiencias digitales que ayudan a las empresas a destacar, conectar con sus clientes y crecer online.",
  alternates: { canonical: "/", languages: { "es-PE": "/", "en-US": "/en" } },
};

export default function Page() {
  return <HomePage />;
}
