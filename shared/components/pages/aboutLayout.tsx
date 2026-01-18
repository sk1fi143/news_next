import React from "react";

import { AboutUs } from "../shared/about/about";
import Form from "../shared/about/form";
import { Contact } from "../shared/contact";
import { Head } from "../shared/head";
import { Map } from "@/shared/components/shared/map";
import { Line } from "../shared/line";

import { CardsProps } from "@/shared/interface/cards";
import {
  AboutDataItem,
  AboutTextBlock,
  AboutContactInfoBlock,
  AboutContactsBlock,
  AboutSocialsBlock,
} from "@/shared/interface/IAbout";
import { ContactInfo } from "../shared/about/contact-info";

interface Props {
  newsData: CardsProps[];
  aboutData: AboutDataItem[];
}

export const AboutLayout: React.FC<Props> = ({ newsData, aboutData }) => {
  const about = aboutData.find(
    (item): item is AboutTextBlock => "cards" in item && "text" in item,
  );

  const contactInfo = aboutData.find(
    (item): item is AboutContactInfoBlock =>
      "data" in item && !Array.isArray(item.data) && "fullname" in item.data,
  );

  const socials = aboutData.find(
    (item): item is AboutSocialsBlock =>
      "data" in item &&
      Array.isArray(item.data) &&
      item.data.length > 0 &&
      "icon" in item.data[0],
  );

  const contacts = aboutData.find(
    (item): item is AboutContactsBlock =>
      "data" in item &&
      Array.isArray(item.data) &&
      item.data.length > 0 &&
      "contact" in item.data[0],
  );

  return (
    <main>
      <Head breadcrumbs title="О нас" />

      {about && <AboutUs data={about} />}

      <div className="about__row">
        {contactInfo && (
          <ContactInfo {...contactInfo.data} soc={socials?.data ?? []} />
        )}
        <Form />
      </div>

      <Line />

      <div className="about__contacts">
        {contacts?.data.map((contact) => (
          <Contact
            key={contact.title}
            title={contact.title}
            contact={contact.contact}
            mail={contact.mail}
            className="about__contacts-item"
          />
        ))}
      </div>

      <Line />

      <Map data={newsData} />
    </main>
  );
};
