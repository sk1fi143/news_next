"use client";

import React, { useRef } from "react";
import { Download } from "@cmp/svg/download";
import { Socials } from "../socials";
import { SocialItem } from "@/shared/interface/IAbout";

interface Props {
  fullname: string;
  inn: string;
  kpp: string;
  okpo: string;
  okato: string;
  ogrn: string;
  tkved: string;
  address: string;
  soc: SocialItem[];
}

export const ContactInfo: React.FC<Props> = ({
  fullname,
  inn,
  kpp,
  okpo,
  okato,
  ogrn,
  tkved,
  address,
  soc,
}) => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  return (
    <div className="contact-info">
      <h4 className="contact-info__title">Контактная информация</h4>
      <Socials soc={soc}/>
      <h5 className="contact-info__fullname">
        Полное наименование:
        <br />
        {fullname}
      </h5>
      <div className="contact-info__description">
        <span className="contact-info__description-el">ИНН {inn}</span>
        <span className="contact-info__description-el">КПП {kpp}</span>
        <span className="contact-info__description-el">ОКПО {okpo}</span>
        <span className="contact-info__description-el">ОКАТО {okato}</span>
        <span className="contact-info__description-el">ОГРН {ogrn}</span>
        <span className="contact-info__description-el">ТКВЭД {tkved}</span>
      </div>
      <div className="contact-info__address-block">
        <span className="contact-info__address-title">
          Юридический, фактический и почтовый адрес:
        </span>
        <span className="contact-info__address-txt">{address}</span>
      </div>
      <div className="contact-info__download" onClick={handleDownload}>
        <div className="contact-info__download-content">
          <Download />
          <span className="contact-info__download-txt">Скачать реквизиты</span>
          <span className="contact-info__download-pdf">PDF</span>
        </div>
      </div>
      <a
        ref={downloadRef}
        href="/реквизиты.pdf"
        download="реквизиты.pdf"
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </div>
  );
};
