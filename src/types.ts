import type { Ref } from "vue";

export interface Bookmark {
  id: number;
  title: string;
  url: string;
  favicon: string;
}

export interface Category {
  id: number;
  title: string;
  children: Array<(Bookmark | Category)>;
}

export interface Data {
  id: 0,
  title: "root",
  children: Array<Category>,
  columns: Array<Array<Category>>,
}

export interface Styles {
  colorTheme: Array<string>,
  fontSize: fontSize,
  fontFamily: string,
  columnsCount: number,
}

export interface fontSize {
  title: string,
  mainSize: number,
  titleSize: number,
  margin: number,
}

export interface Settings {
  styles: Styles,
  saveToLocalSettings(): void,
  loadFromLocalStore(): void,
  onLoad(): void,
  setTheme(theme: Array<string>): void,
  setFontSize(fontSize: fontSize): void,
  setFont(event: Event): void,
  setColumnsCount(): void,
}

export interface Styles {
  colorTheme: Array<string>,
  fontSize: fontSize,
  fontFamily: string,
  columnsCount: number,
}

export interface fontSize {
  title: string,
  mainSize: number,
  titleSize: number,
  margin: number,
}

export interface Settings {
  styles: Styles,
  edit: boolean,
  saveToLocalSettings(): void,
  loadFromLocalStore(): void,
  onLoad(): void,
  setTheme(theme: Array<string>): void,
  setFontSize(fontSize: fontSize): void,
  setFont(event: Event): void,
  setColumnsCount(): void,
}

export interface Store {
  data: Data;
  closed: Array<number>,
  arrangeCards(cards: Array<Category>): void;
  deleteNode(nodeId: number): void;
  addCategory(title: string): void;
  editCategory(categoryId: number, newTitle: string): void;
  addBookmark(nodeId: number, title: string, url: string): void;
  editBookmark(bookmarkId: number, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  findMaxId(node: Category): number;
  findNodeById(node: Category | Bookmark, id: number): Category | Bookmark | null;
  findParentNodeById(node: Category | Bookmark, id: number): Category | null;
  updateFaviconLink(urlInput: string, bookmark: Bookmark): void;
  updateBookmarkTitle(urlInput: string, bookmarkId: number): Promise<void>
}