import type { Metadata } from "next";
import '../shared/styles/app.scss';
import { Header } from '@cmp/shared/header/header';
import { Footer } from "@cmp/shared/footer/footer";
import { Inter } from 'next/font/google';
import { NewsData } from "@/shared/models/newsData";
import { generateWebSiteSchema, generateOrganizationSchema } from "@/shared/lib/schema";
import { JsonLd } from "@/shared/components/schema/json-ld";
import { AboutData } from "@/shared/models/about";
import { buildPageMetadata, getSiteUrl } from "@/shared/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/", {
    title: "Новая Версия Приволжье - Новости регионов",
    description:
      "Актуальные новости и статьи регионов Приволжья: Марий Эл, Татарстан, Чувашия, Нижегородская область, Кировская область",
    image: "/images/card.png",
    type: "website",
  });
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  
  // Получаем информацию об организации из AboutData
  const contactInfo = AboutData.find(item => item.slug === "Контактная информация")?.data as any;
  const contacts = AboutData.find(item => item.slug === "Контакты")?.data as any[];
  
  // Генерируем разметку WebSite
  const webSiteSchema = generateWebSiteSchema({
    name: "Новая Версия Приволжье",
    url: siteUrl,
    description: "Актуальные новости и статьи регионов Приволжья",
    searchUrl: `${siteUrl}/search`,
  });

  // Генерируем разметку Organization
  const organizationSchema = generateOrganizationSchema({
    name: contactInfo?.fullname || "Новая Версия Приволжье",
    url: siteUrl,
    description: "Общероссийская еженедельная газета новостей регионов Приволжья",
    address: contactInfo?.address,
    email: contacts?.[0]?.mail,
    telephone: contacts?.[1]?.contact,
  });

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1"/>
        <JsonLd data={webSiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Header data={NewsData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
