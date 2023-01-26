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
  addBookmark(title: string, url: string, category: string): void;
  deleteBookmark(id: number): void;
}
