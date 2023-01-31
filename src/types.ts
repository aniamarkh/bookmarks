export interface Bookmark {
  id: number;
  title: string;
  url: string;
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
};

export interface Store {
  data: Category;
  deleteNode(nodeId: number): void;
  addCategory(parentId: number, title: string): void;
  editCategory(categoryId: number, newTitle: string): void;
  addBookmark(nodeId: number, title: string, url: string): void;
  editBookmark(bookmarkId: number, newTitle: string, newUrl: string): void;
  saveToLocalStore(): void;
  loadFromLocalStore(): void;
  findMaxId(node: Category): number;
  findNodeById(node: Category | Bookmark, id: number): Category | Bookmark | null;
  findParentNodeById(node: Category | Bookmark, id: number): Category | null;
}