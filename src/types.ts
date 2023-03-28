import type { Ref } from "vue";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
}

export interface Category {
  id: string;
  title: string;
  children: Array<(Bookmark | Category)>;
}

export interface Data {
  id: "0",
  title: "root",
  columns: Array<Array<Category | Bookmark>>,
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
  columnWidth: number,
}

export interface fontSize {
  title: string,
  mainSize: number,
  titleSize: number,
  margin: number,
}

export interface Settings {
  styles: Styles;
  edit: boolean;
  saveToLocalSettings(): void;
  loadFromLocalStore(): void;
  onLoad(): void;
  setTheme(theme: Array<string>): void;
  setFontSize(fontSize: fontSize): void;
  setFont(event: Event): void;
  setColumnsCount(): void;
  setColumnWidth(): void;
}

export interface Store {
  data: Data;
  closed: Array<string>,
  hidden: Category,
  arrangeCards(cards: Array<Category | Bookmark>): void;
  deleteNode(nodeId: string): void;
  hideCategory(nodeToDelete: Category): void;
  addCategory(categoryTitle: string): void;
  editCategory(categoryId: string, newTitle: string): void;
  addBookmark(parentNodeId: string, bookmarkTitle: string, bookmarkUrl: string): Promise<void>
  editBookmark(bookmarkId: string, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  findNodeById(node: Category | Bookmark | Data, id: string): Category | Bookmark | Data | null;
  findParentNodeById(node: Category | Bookmark | Data, id: string): Category | Data | null;
  updateFaviconLink(urlInput: string, bookmark: Bookmark): void;
  updateBookmarkTitle(urlInput: string, bookmarkId: string): Promise<void>;
}

export interface ChromeHandle {
  importChromeBookmarks(): void;
  addCategoriesFromChrome(chromeCat: chrome.bookmarks.BookmarkTreeNode, parentNode: Array<Category | Bookmark>): void;
  moveNode(newParentId: string, movedNodeId: string, newIndex: number): void;
  onNodeChange(id: string, changeInfo: ChangeInfo): void;
}

export interface ChangeInfo {
  title: string,
  url?: string,
}