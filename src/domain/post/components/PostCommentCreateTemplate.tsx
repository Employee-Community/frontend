import { Button, Input, message } from "antd";
import { useState } from "react";
import { postCommentApi } from "../service/postCommentApi";


interface Props {
    postIdx: number;
    onSuccess?: () => void;
}

const { TextArea } = Input;

export default function PostCommentCreateTemplate({ postIdx, onSuccess }: Props) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) {
            message.warning("댓글 내용을 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            await postCommentApi.createComment({ postIdx, content });
            message.success("댓글이 등록되었습니다.");
            setContent("");
            onSuccess?.();
        } catch (e) {
            console.log(e);
            message.error("댓글 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: 16 }}>
            <TextArea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력해주세요."
            />
            <Button
                type="primary"
                loading={loading}
                onClick={handleSubmit}
                style={{ marginTop: 8 }}
            >
                댓글 작성
            </Button>
        </div>
    );
}
