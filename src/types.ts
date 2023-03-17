import type { Ref } from "vue";

export interface Bookmark {
  id: string;
  parentId: string | undefined;
  title: string;
  url: string;
  favicon: string;
}

export interface Category {
  id: string;
  parentId: string | undefined;
  title: string;
  children: Array<(Bookmark | Category)>;
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

export interface ChromeTreeNode {
  id: "0",
  title: "root",
  children: Array<Category>,
}

export interface DataNode {
  id: string,
  children?: Array<DataNode>
}

export interface Store {
  data: Array<Array<DataNode>>;
  closed: Array<string>,
  chromeTreeNode: ChromeTreeNode,
  // getCategoriesByIds(): Array<Array<chrome.bookmarks.BookmarkTreeNode>>;
  arrangeCards(cards: Array<Category>): void;
  mapToDataNodes(items: Array<Bookmark | Category>): Array<DataNode>
  // deleteNode(nodeId: number): void;
  // addCategory(title: string): void;
  // editCategory(categoryId: number, newTitle: string): void;
  // addBookmark(nodeId: number, title: string, url: string): void;
  // editBookmark(bookmarkId: number, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  // findMaxId(node: Category | Bookmark | Data): number;
  findNodeById(node: Category | Bookmark | ChromeTreeNode, id: string): Category | Bookmark | ChromeTreeNode | null;
  // findParentNodeById(node: Category | Bookmark | Data, id: number): Category | Data | null;
  updateFaviconLink(urlInput: string, bookmark: Bookmark): void;
  // updateBookmarkTitle(urlInput: string, bookmarkId: number): Promise<void>;
  importChromeBookmarks(): Promise<void>;
  addCategoriesFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode): void;
}