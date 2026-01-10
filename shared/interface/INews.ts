export interface INewsInfo {
  update: string;
  author: string;
  timeRead: string;
}

export interface INewsContent {
    title?: string;
    titleType?: string;
    image?: boolean;
    imageUrl?: string;
    imageDescription?: string;
    text?: string;
    numTitle?: string;
    numListText?: string;
    markTitle?: string;
    markListText?: string;
}

export interface INewsItem {
  id: string | number;
  title: string;
  info: INewsInfo;
  tags: string[];
  content: INewsContent[];
}