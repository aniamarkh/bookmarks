export interface Bookmark {
  id: number;
  title: string;
  url: string;
}

export interface Category {
  id: number;
  title: string;
  bookmarks: Array<number>;
}

export interface Store {
  bookmarks: Bookmark[];
  categories: Category[];
  addCategory(title: string): void;
  getBookmarksFor(categoryId: number): Array<Bookmark>;
  addBookmark(title: string, url: string, categoryId: number): void;
  deleteBookmark(bookmarkId: number, categoryId: number): void;
}
