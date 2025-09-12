import api from "../../../common/config/axios";

export interface PostCategoryResponse {
    idx: number;
    name: string;
    imageUrl: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
}

export const postCategoryApi = {
    getPostCategories: () => api.get<ApiResponse>(`/post/category`),
};