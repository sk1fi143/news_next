import { Metadata } from "next";
import { AboutData } from "@/shared/models/about";
import { ContactsLayout } from "@/shared/components/pages/contactsLayout";
import { buildPageMetadata } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/contacts", {
    title: "Контакты - Новая Версия Приволжье",
    description: "Контакты - Новая Версия Приволжье",
    image: "/images/card.png",
    type: "website",
  });
}

export default function Contacts() {
  return (
    <ContactsLayout aboutData={AboutData} />
  );
}