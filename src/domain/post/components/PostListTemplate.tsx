import { List } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi, type PostPagingRequest } from "../service/postApi";
import type { PostResponse } from "../types/PostTypes";
import PostTemplate from "./PostTemplate";

type Props = {
    categoryIdx?: string;
};

function PostListTemplate({ categoryIdx }: Props) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostResponse[]>([]);

    useEffect(() => {
        if (!categoryIdx) {
            navigate("/posts");
            return;
        }

        const requestBody: PostPagingRequest = {
            memberIdx: 0,
            categoryIdx: Number(categoryIdx),
            page: 0,
            size: 10,
            keyword: "",
            search: "",
        };

        setLoading(true);
        postApi
            .getPosts(requestBody)
            .then((response) => {
                const results = response.data.data.data;

                console.log("게시글 리스트:", results);
                setPosts(results);
                setLoading(false);
            })
            .catch((err) => {
                console.error("게시글 불러오기 실패:", err);
                navigate("/posts");
                setLoading(false);
            })
    }, [navigate, categoryIdx]);

    return (
        <List
            bordered
            loading={loading}
            dataSource={posts}
            renderItem={(post) => (
                <List.Item>
                    <PostTemplate {...post} />
                </List.Item>
            )}
        />
    );
}

export default PostListTemplate;
