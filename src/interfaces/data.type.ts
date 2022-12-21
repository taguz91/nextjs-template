export interface Link {
  href: string;
}

export interface Links {
  self: Link;
  first: Link;
  last: Link;
}

export interface Meta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface DataResponse<T> {
  data: T[];
  _links: Links;
  _meta: Meta;
}

export interface BaseModel {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MapValue {
  name: string;
  path: string;
}
