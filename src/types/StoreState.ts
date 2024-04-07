export default interface StoreState {
  packagesSearchResult: {
    objects: Array<{
      package: {
        name: string;
        description: string;
        keywords: string[];
      };
    }>;
    total: number;
  };
  pagination: number;
  pages: number;
  query: string;
  isLoading: boolean;
  isShowModal: boolean;
  currentPackage:
    | {
        name: string;
        description: string;
        keywords: string[];
      }
    | any;
  entryPoints: object | any;
}
