import { INewsInfo } from "@/shared/interface/INews";
import React from "react";

export const NewsInfo: React.FC<INewsInfo> = ({ update, author, timeRead }) => {
    return (
        <div className="news-info">
            <h4 className="news-info__title">Информация</h4>
            <div className="news-info__content">
                <div className="news-info__element">
                    <span className="news-info__category">Обновлено:</span>
                    <span className="news-info__meaning">{update}</span>
                </div>
                <div className="news-info__element">
                    <span className="news-info__category">Автор:</span>
                    <span className="news-info__meaning">{author}</span>
                </div>
                <div className="news-info__element">
                    <span className="news-info__category">Время чтения:</span>
                    <span className="news-info__meaning">{timeRead}</span>
                </div>
            </div>
        </div>
    );
};
