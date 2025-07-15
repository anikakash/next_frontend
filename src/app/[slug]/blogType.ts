export interface BlogResponse {
  blogs: BlogPost[];
}

export interface BlogPost {
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  slug?: string;
  description: string | ContentBlock[];
  image: Image[];
  categories: Category[];
  author: Author;
  comments: Comment[];
}

export interface ContentBlock {
  type: string;
  children: ContentChild[];
  level?: number;
  format?: 'ordered' | 'unordered';
}

export interface ContentChild {
  type: string;
  text?: string;
  children?: ContentChild[];
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    large?: ImageFormat;
  };
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Category {
  documentId: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Author {
  documentId: string;
  name: string;
  email?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Comment {
  documentId: string;
  name: string;
  comment: string | ContentBlock[];
  approved: boolean;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}