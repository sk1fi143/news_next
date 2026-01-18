import { NewsInfo } from "@/shared/components/shared/news/news-info";
import { INewsItem } from "@/shared/interface/INews";
import { Head } from "../shared/head";
import { NewsFeed } from "../shared/news-feed";
import Image from "next/image";
import TestImage from "@img/card.png";
import { Fragment } from "react/jsx-runtime";
import { Socials } from "../shared/socials";
import { AboutData } from "@/shared/models/about";
import { SocialItem } from "@/shared/interface/IAbout";
import { Line } from "../shared/line";
import { ReadNow } from "../shared/read-now";
import { Map } from "../shared/map";
import { CardsProps } from "@/shared/interface/cards";
interface Props {
  data: INewsItem;
  newsData: CardsProps[];
}
export const NewsPageLayout: React.FC<Props> = ({ data, newsData }) => {
  return (
    <main className="newsMain">
      <Head breadcrumbs title={data.title} breadcrumbsSlug={data.title} />
      <div className="news__content">
        <div className="news__left-content">
          <div className="news__tags">
            {data.tags.map((tag, index) => (
              <div key={index} className="news__tag">
                {tag}
              </div>
            ))}
          </div>

          <NewsInfo
            update={data.info.update}
            author={data.info.author}
            timeRead={data.info.timeRead}
          />

          {data.content.map((item, index) => {
            const TitleTag =
              (item.titleType as "h1" | "h2" | "h3" | "h4" | "h5" | "h6") ||
              "h2";

            return (
              <section key={index} className="news-section">
                {item.title && <TitleTag>{item.title}</TitleTag>}

                {item.image && item.imageUrl && (
                  <figure className="news-image">
                    <Image
                      src={TestImage}
                      alt={item.imageDescription || "Описание изображения"}
                    />
                    {item.imageDescription && (
                      <figcaption>{item.imageDescription}</figcaption>
                    )}
                  </figure>
                )}

                {item.text &&
                  item.text.split("\n").map(
                    (paragraph, pIdx) =>
                      paragraph.trim() && (
                        <Fragment key={pIdx}>
                          <p>{paragraph}</p>
                          <br />
                        </Fragment>
                      )
                  )}

                {item.numListText && (
                  <div className="num-list-block">
                    {item.numTitle && <h5>{item.numTitle}</h5>}
                    <ol>
                      {item.numListText
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx}>{li}</li>
                        )}
                    </ol>
                  </div>
                )}

                {item.markListText && (
                  <div className="mark-list-block">
                    {item.markTitle && <h6>{item.markTitle}</h6>}
                    <ul>
                      {item.markListText
                        .split("\n")
                        .map(
                          (li, liIdx) => li.trim() && <li key={liIdx}>{li}</li>
                        )}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
           <Socials
          soc={
            (AboutData.find((item) => item.slug === "Социальные сети")?.data ||
              []) as SocialItem[]
          }
        />
        </div>

        <div className="news__right-content">
          <NewsFeed title="Новости" link="news" data={newsData}  firstCard="newsCard-S"/>
        </div>
      </div>
      <Line />
      <ReadNow data={newsData}/>
      <Map data={newsData}/>
    </main>
  );
};
