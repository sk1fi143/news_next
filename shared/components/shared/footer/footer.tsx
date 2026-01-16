import React from "react";
import { Tabs } from "./tabs";
import { Social } from "./social";
import { Contact } from "../contact";
import { Logo_Footer } from "@cmp/svg/logo_Footer";
import { AboutData } from "@/shared/models/about";
import { IContact, SocialItem } from "@/shared/interface/IAbout";
import { RegionLink } from "../region-link";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-column">
          <RegionLink href="/">
            <Logo_Footer className="footer__logo"/>
          </RegionLink>
          <Tabs />
          <p className="footer__content-column-text">
            Подпишитесь на наши социальные сети чтобы не пропустить свежие
            новости
          </p>
          <Social
            data={
              (AboutData.find((item) => item.slug === "Социальные сети")
                ?.data || []) as SocialItem[]
            }
          />
        </div>
        <div className="footer__content-columnContacts">
          <h2 className="footer__content-columnContacts-title">Контакты</h2>
          <div className="footer__content-contacts">
            {(() => {
              const contactsList = (AboutData.find(
                (item) => item.slug === "Контакты"
              )?.data || []) as IContact[];

              return [2, 1, 4, 3, 0].map((index) => {
                const contact = contactsList[index];

                if (!contact) return null;

                return (
                  <Contact
                    key={contact.title}
                    title={contact.title}
                    contact={contact.contact}
                    mail={contact.mail}
                  />
                );
              });
            })()}
            <div className="contact">
              <h6 className="contact__title">Юридические документы</h6>
              <RegionLink href="/policy" className="contact__row contact__row-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.16943 8.70361C5.56 8.31358 6.19313 8.31325 6.5835 8.70361C6.97378 9.09398 6.97351 9.72714 6.5835 10.1177L5.40479 11.2964C4.49342 12.2078 4.49371 13.6851 5.40479 14.5962C6.31579 15.5071 7.79323 15.5073 8.70459 14.5962L9.88135 13.4175C10.2717 13.0271 10.9058 13.0272 11.2964 13.4175C11.6867 13.8077 11.6863 14.4409 11.2964 14.8315L10.1196 16.0103H10.1187C8.42651 17.7021 5.68208 17.7026 3.98975 16.0103C2.29772 14.3178 2.29874 11.5743 3.99072 9.88232L5.16943 8.70361ZM11.6509 6.93604C12.0414 6.54597 12.6746 6.54566 13.0649 6.93604C13.4553 7.32641 13.455 7.95955 13.0649 8.3501L8.35107 13.064C7.96057 13.4545 7.32754 13.4544 6.93701 13.064C6.54649 12.6734 6.54649 12.0404 6.93701 11.6499L11.6509 6.93604ZM9.88232 3.98975C11.5747 2.29771 14.3182 2.29775 16.0103 3.98975C17.7023 5.68181 17.7018 8.4244 16.0103 10.1167L14.8325 11.2964C14.4421 11.6867 13.809 11.6867 13.4185 11.2964C13.028 10.9059 13.0281 10.2729 13.4185 9.88232L14.5962 8.70361L14.7563 8.52686C15.5039 7.61036 15.4504 6.25808 14.5962 5.40381C13.685 4.49268 12.2075 4.493 11.2964 5.40381L10.1187 6.58154C9.72813 6.97206 9.09511 6.97206 8.70459 6.58154C8.31408 6.19102 8.31407 5.558 8.70459 5.16748L9.88232 3.98975Z"
                    fill="#7C7C7C"
                  />
                </svg>
                <span className="contact__text">
                  Политика конфиденциальности
                </span>
              </RegionLink>
              <RegionLink href="/agreement" className="contact__row contact__row-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5.16943 8.70361C5.56 8.31358 6.19313 8.31325 6.5835 8.70361C6.97378 9.09398 6.97351 9.72714 6.5835 10.1177L5.40479 11.2964C4.49342 12.2078 4.49371 13.6851 5.40479 14.5962C6.31579 15.5071 7.79323 15.5073 8.70459 14.5962L9.88135 13.4175C10.2717 13.0271 10.9058 13.0272 11.2964 13.4175C11.6867 13.8077 11.6863 14.4409 11.2964 14.8315L10.1196 16.0103H10.1187C8.42651 17.7021 5.68208 17.7026 3.98975 16.0103C2.29772 14.3178 2.29874 11.5743 3.99072 9.88232L5.16943 8.70361ZM11.6509 6.93604C12.0414 6.54597 12.6746 6.54566 13.0649 6.93604C13.4553 7.32641 13.455 7.95955 13.0649 8.3501L8.35107 13.064C7.96057 13.4545 7.32754 13.4544 6.93701 13.064C6.54649 12.6734 6.54649 12.0404 6.93701 11.6499L11.6509 6.93604ZM9.88232 3.98975C11.5747 2.29771 14.3182 2.29775 16.0103 3.98975C17.7023 5.68181 17.7018 8.4244 16.0103 10.1167L14.8325 11.2964C14.4421 11.6867 13.809 11.6867 13.4185 11.2964C13.028 10.9059 13.0281 10.2729 13.4185 9.88232L14.5962 8.70361L14.7563 8.52686C15.5039 7.61036 15.4504 6.25808 14.5962 5.40381C13.685 4.49268 12.2075 4.493 11.2964 5.40381L10.1187 6.58154C9.72813 6.97206 9.09511 6.97206 8.70459 6.58154C8.31408 6.19102 8.31407 5.558 8.70459 5.16748L9.88232 3.98975Z"
                    fill="#7C7C7C"
                  />
                </svg>
                <span className="contact__text">
                  Пользовательское соглашение
                </span>
              </RegionLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
