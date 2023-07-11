export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
}

export interface Category {
  id: string;
  title: string;
  children: Array<Bookmark | Category>;
}

export interface Data {
  id: "2";
  title: "root";
  columns: Array<Array<Category | Bookmark>>;
}

export interface Styles {
  colorTheme: Array<string>;
  fontSize: fontSize;
  fontFamily: string;
  columnsCount: number;
}

export interface fontSize {
  title: string;
  mainSize: number;
  titleSize: number;
  margin: number;
}

export interface Settings {
  styles: Styles;
  saveToLocalSettings(): void;
  loadFromLocalStore(): void;
  onLoad(): void;
  setTheme(theme: Array<string>): void;
  setFontSize(fontSize: fontSize): void;
  setFont(event: Event): void;
  setColumnsCount(): void;
  setGlobalTopMargin(): void;
}

export interface Styles {
  colorTheme: Array<string>;
  fontSize: fontSize;
  fontFamily: string;
  columnsCount: number;
  columnWidth: number;
  globalTopMargin: number;
}

export interface fontSize {
  title: string;
  mainSize: number;
  titleSize: number;
  margin: number;
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
  closed: Array<string>;
  hidden: Category;
  arrangeCards(cards: Array<Category | Bookmark>): void;
  deleteNode(nodeId: string): void;
  hideCategory(nodeToDelete: Category): void;
  addCategory(category: chrome.bookmarks.BookmarkTreeNode): void;
  editCategory(category: chrome.bookmarks.BookmarkTreeNode): void;
  addBookmark(bookmark: chrome.bookmarks.BookmarkTreeNode): Promise<void>;
  editBookmark(id: string, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  findNodeById(
    node: Category | Bookmark | Data,
    id: string
  ): Category | Bookmark | Data | null;
  findParentNodeById(
    node: Category | Bookmark | Data,
    id: string
  ): Category | Data | null;
  updateFaviconLink(urlInput: string, bookmark: Bookmark): void;
  updateBookmarkTitle(urlInput: string, bookmarkId: string): Promise<void>;
  moveNode(newParentId: string, movedNodeId: string, newIndex: number): void;
}

export interface ChromeHandle {
  fromUI: boolean;
  importChromeBookmarks(): void;
  addCategoriesFromChrome(
    chromeCat: chrome.bookmarks.BookmarkTreeNode,
    parentNode: Array<Category | Bookmark>
  ): void;
  deleteNodeFromChrome(nodeId: string): void;
  addCategoryToChrome(categoryTitle: string): void;
  editCategoryInChrome(categoryId: string, newTitle: string): void;
  addBookmarkToChrome(
    parentNodeId: string,
    bookmarkTitle: string,
    bookmarkUrl: string
  ): void;
  editBookmarkInChrome(
    bookmarkId: string,
    newTitle: string,
    newUrl: string
  ): void;
  onNodeChange(id: string, changeInfo: ChangeInfo): void;
  changeParent(id: string, moveInfo: MoveInfo): void;
  onCreated(id: string, changeInfo: chrome.bookmarks.BookmarkTreeNode): void;
  onRemoved(id: string, removeInfo: RemoveInfo): void;
}

export interface ChangeInfo {
  title: string;
  url?: string;
}

export interface MoveInfo {
  index: number;
  oldIndex: number;
  oldParentId: string;
  parentId: string;
}

export interface RemoveInfo {
  index: number;
  node: chrome.bookmarks.BookmarkTreeNode;
  parentId: string;
}
