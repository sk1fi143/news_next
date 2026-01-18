

export interface AboutBase {
  slug: string;
}

export interface ICardAbout {
  title: string;
  text: string;
}


export interface AboutTextBlock extends AboutBase {
  text: string;
  cards: ICardAbout[];
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

export interface AboutContactInfoBlock extends AboutBase {
  data: IContactInfo;
}

export interface IContact {
  title: string;
  contact: string;
  mail: string;
}

export interface AboutContactsBlock extends AboutBase {
  data: IContact[];
}

export interface SocialItem {
  name: string;
  link: string;
  icon: string;
}

export interface AboutSocialsBlock extends AboutBase {
  data: SocialItem[];
}

export type AboutDataItem =
  | AboutTextBlock
  | AboutContactInfoBlock
  | AboutContactsBlock
  | AboutSocialsBlock;