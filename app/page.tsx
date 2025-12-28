import { Cards } from "@cmp/shared/cards/cards";
import { NewsData } from "@/shared/models/newsData";
import { Form } from "@cmp/shared/form";
import { PromoCards } from "@cmp/shared/promo/cards";

export default function Home() {
  return (
    <>
      <PromoCards />
      {NewsData.map((cards) => (
        <Cards key={cards.title} data={cards} />
      ))}
      <Form />
    </>
  );
}
