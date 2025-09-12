import { Button, List, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { postCommentApi } from "../service/postCommentApi";

interface Props {
    postIdx: number;
}

interface PostComment {
    idx: number;
    postIdx: number;
    memberIdx: number;
    content: string;
    createdAt: string;
}

export default function PostCommentListTemplate({ postIdx }: Props) {
    const [comments, setComments] = useState<PostComment[]>([]);
    const [loading, setLoading] = useState(false);

    const getComments = useCallback(async () => {
        setLoading(true);
        try {
            const res = await postCommentApi.getComments(postIdx, { page: 0, size: 10, search: "", keyword: "" });
            console.log(res);
            setComments(res.data.data.data || []);
        } catch (e) {
            console.log(e);
            message.error("댓글 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }, [postIdx]);

    const handleDelete = async (idx: number) => {
        try {
            await postCommentApi.deleteComment(idx);
            message.success("댓글이 삭제되었습니다.");
            getComments(); // 삭제 후 댓글 목록 갱신
        } catch {
            message.error("댓글 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        getComments();
    }, [getComments]);

    return (
        <List
            header={`${comments.length}개의 댓글`}
            bordered
            loading={loading}
            dataSource={comments}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <Button
                            type="link"
                            danger
                            size="small"
                            onClick={() => handleDelete(item.idx)}
                        >
                            삭제
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        title={`작성자 #${item.memberIdx}`}
                        description={item.content}
                    />
                    <div>{new Date(item.createdAt).toLocaleString()}</div>
                </List.Item>
            )}
        />
    );
}
