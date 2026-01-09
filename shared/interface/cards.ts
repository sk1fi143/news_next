export interface CardsProps {
  title: string;
  slug: string;
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
