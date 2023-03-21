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
  hidden: Array<DataNode>,
  chromeTreeNode: ChromeTreeNode,
  arrangeCards(cards: Array<Category>): void;
  mapToDataNodes(items: Array<Bookmark | Category>): Array<DataNode>
  deleteNode(nodeId: string): void;
  deleteDataNode(data: Array<DataNode>, id: string): void;
  addCategory(title: string): void;
  editCategory(categoryObj: Category, newTitle: string): void;
  addBookmark(parentDataNode: DataNode, bookmarkTitle: string, bookmarkUrl: string): void;
  editBookmark(bookmarkObj: Bookmark, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  findNodeById(node: Category | Bookmark | ChromeTreeNode, id: string): Category | Bookmark | ChromeTreeNode | null;
  updateFaviconLink(urlInput: string, bookmark: Bookmark): void;
  updateBookmarkTitle(urlInput: string, bookmarkObj: Bookmark): Promise<void>;
  importChromeBookmarks(): Promise<void>;
  addCategoriesFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode): void;
}