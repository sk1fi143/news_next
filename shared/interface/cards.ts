export interface CardsProps {
  title: string;
  slug?: string;
  region?: string;
  cardsData: CardProps[];
}

export interface CardProps {
  className?: string;
  id: string | number;
  title: string;
  location: string;
  time: string;
  imageUrl: string;
}

export interface IPromoCards {
  id: string | number;
  type: string;
  title: string;
  description: string;
  time: string;
}