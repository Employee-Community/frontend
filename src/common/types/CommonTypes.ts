export type CommonPagingResponse = {
    page: number;
    size: number;
    search: string;
    keyword: string;
    totalCount: number;
    totalPage: number;
    data: any;
}