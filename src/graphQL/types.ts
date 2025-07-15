export interface BlogImage {
  url: string;
  height: number;
  width: number;
  alternativeText: string | null;
}

export interface Category {
  documentId: string;
  name: string;
}

export interface Author {
  documentId: string;
  name: string;
}

export interface Comment {
  documentId?: string; // Made optional as some comments seem to lack this
  name?: string; // Made optional as some comments seem to lack this
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface Blog {
  title: string;
  description: any[]; // This appears to be a complex structure with types, levels, and children
  createdAt: string;
  documentId: string;
  categories: Category[];
  image: BlogImage[];
  author: Author;
  comments: Comment[];
}

export interface BlogsResponse {
  blogs: Blog[];
}

// Single blog response type for getBlogDetails function
export interface BlogResponse {
  blogs: [Blog];
}
