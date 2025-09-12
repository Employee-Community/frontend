import api from "../../../common/config/axios";
import type { CommonPagingRequest } from "../../../common/service/commonApi";

export interface PostCommentCreateRequest {
    postIdx: number;
    content: string;
}

export interface PostCommentUpdateRequest {
    idx: number;
    content: string;
}

export interface PostCommentPagingRequest extends CommonPagingRequest {
    postIdx?: number;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: any;
    timestamp: string;
}

export const postCommentApi = {
    createComment: (data: PostCommentCreateRequest) =>
        api.post<ApiResponse>("/post/comment/create", data),

    updateComment: (data: PostCommentUpdateRequest) =>
        api.put<ApiResponse>(`/post/comment/${data.idx}`, data),

    deleteComment: (idx: number) =>
        api.delete<ApiResponse>(`/post/comment/${idx}`),

    getComments: (postIdx: number, params: PostCommentPagingRequest) =>
        api.get<ApiResponse>(`/post/comment/${postIdx}`, { params }),

    getMyComments: (params: PostCommentPagingRequest) =>
        api.get<ApiResponse>("/post/comment/my", { params }),
};
