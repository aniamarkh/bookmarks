export interface Bookmark {
  id: number;
  title: string;
  url: string;
  category: string;
}

export interface Store {
  bookmarks: Array<Bookmark>;
  addBookmark(title: string, url: string, category: string): void;
  deleteBookmark(id: number): void;
}
