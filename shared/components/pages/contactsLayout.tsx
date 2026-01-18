import React from "react";

import Form from "../shared/about/form";
import { Contact } from "../shared/contact";
import { Head } from "../shared/head";
import { Line } from "../shared/line";

import {
  AboutDataItem,
  AboutContactInfoBlock,
  AboutContactsBlock,
  AboutSocialsBlock,
} from "@/shared/interface/IAbout";
import { ContactInfo } from "../shared/about/contact-info";

interface Props {
  aboutData: AboutDataItem[];
}

export const ContactsLayout: React.FC<Props> = ({ aboutData }) => {
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
    <Head breadcrumbs title="Контакты" />
      <div className="about__row about__row-contacts">
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
    </main>
  );
};