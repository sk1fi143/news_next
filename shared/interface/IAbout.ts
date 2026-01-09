export interface SocialItem {
  name: string;
  link: string;
  icon: string;
}

export interface IContact {
  title: string;
  contact: string;
  mail: string;
}

export interface IContactInfo {
  fullname: string;
  inn: string;
  kpp: string;
  okpo: string;
  okato: string;
  ogrn: string;
  tkved: string;
  address: string;
}

interface ICardAbout {
  title: string;
  text: string;
}

export interface DataCardAbout {
  slug: string;
  text: string;
  cards: ICardAbout[];
}
