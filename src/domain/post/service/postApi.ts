import api from "../../../common/config/axios";
import type { CommonPagingRequest } from "../../../common/service/commonApi";

interface PostCreateRequest {
    categoryIdx: number;
    title: string;
    contents: string;
}

export interface PostPagingRequest extends CommonPagingRequest {
    memberIdx: number;
    categoryIdx: number;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
}

export const postApi = {
    createPost: (data: PostCreateRequest) =>
        api.post<ApiResponse>("/posts/create", data),

    getPosts: (data: PostPagingRequest) => api.get<ApiResponse>("/posts", { params: data }),

    getPost: (idx: number) => api.get<ApiResponse>(`/posts/${idx}`),
};
