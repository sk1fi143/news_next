import { RegionLink } from "../shared/region-link";

export const NotFoundLayout: React.FC = () => {
  return (
    <main className="notFound">
      <span className="notFound__error">404</span>
      <h1 className="notFound__title">Страница не найдена</h1>
      <p className="notFound__decription">
        Возможно, вы ввели неверный адрес страницы, либо эта страница уже
        удалена. <br />
        Вы можете вернуться на{" "}
        <RegionLink href="/" className="notFound__decription-primary">
          главную страницу сайта.
        </RegionLink>
      </p>
      <RegionLink href="/" className="notFound__button">
        Вернуться на главную
      </RegionLink>
    </main>
  );
};
