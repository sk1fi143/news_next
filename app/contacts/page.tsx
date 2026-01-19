import { Metadata } from "next";
import { AboutData } from "@/shared/models/about";
import { ContactsLayout } from "@/shared/components/pages/contactsLayout";

export const metadata: Metadata = {
  title: "Контакты - Новая Версия Приволжье",
  description: "Контакты - Новая Версия Приволжье",
};

export default function Contacts() {
  return (
    <ContactsLayout aboutData={AboutData} />
  );
}