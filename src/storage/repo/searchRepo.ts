export interface SearchRepo {
  search(query: string): Promise<object[]>;
}
