import { LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postApi } from "../service/postApi";
import type { PostResponse } from "../types/PostTypes";
import PostCommentCreateTemplate from './PostCommentCreateTemplate';
import PostCommentListTemplate from './PostCommentListTemplate';

function PostDetailTemplate() {
    const params = useParams();
    const [post, setPost] = useState<PostResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.postIdx) {
            navigate(-1);
            return;
        }

        const postIdx = Number(params.postIdx);

        postApi.getPost(postIdx)
            .then((response) => {
                setPost(response.data.data);
            })
            .catch((err) => {
                console.error(err);
                navigate(-1);
            });
    }, [navigate, params])

    if (!post) return <Typography.Text><LoadingOutlined />로딩 중...</Typography.Text>;

    return (
        <div style={{ justifyContent: "center", maxWidth: "800px", margin: "0 auto" }}>
            <Space direction="vertical">
                <Typography.Title level={3}>
                    {post.title}
                </Typography.Title>
                <Typography.Text>
                    {post.nickname}
                </Typography.Text>
                <Typography.Text type="secondary">
                    작성일 {new Date(post.createdAt).toLocaleDateString()} | 조회 {post.viewCount}
                </Typography.Text>
            </Space>

            <Divider />

            <Typography.Paragraph>
                {post.contents}
            </Typography.Paragraph>

            <Divider />

            <Space>
                <Button onClick={() => navigate(`/posts/category/${post.categoryIdx}`)}>목록</Button>
            </Space>

            <Divider />
            <PostCommentCreateTemplate postIdx={post.idx} onSuccess={() => {}} />

            <Divider />
            <PostCommentListTemplate postIdx={post.idx} />
        </div>
    );
}

export default PostDetailTemplate;