import { Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "../service/postApi";
import { postCategoryApi, type PostCategoryResponse } from "../service/postCategoryApi";

function PostCreateTemplate() {
    const [categories, setCategories] = useState<PostCategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        postCategoryApi
            .getPostCategories()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.error("카테고리 불러오기 실패:", err);
            });
    }, []);

    const onFinish = (values: { categoryIdx: number; title: string; contents: string }) => {
        setLoading(true);

        const requestBody = {
            ...values
        };

        postApi
            .createPost(requestBody)
            .then(() => {
                message.success("게시글이 등록되었습니다.");
                navigate(`/posts/category/${values.categoryIdx}`);
                setLoading(false);
            })
            .catch((err) => {
                console.error("게시글 등록 실패:", err);
                message.error("게시글 등록에 실패했습니다.");
                setLoading(false);
            })
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="categoryIdx"
                    label="카테고리"
                    rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
                >
                    <Select placeholder="카테고리를 선택하세요">
                        {categories.map((cat) => (
                            <Select.Option key={cat.idx} value={cat.idx}>
                                {cat.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="title"
                    label="제목"
                    rules={[
                        { required: true, message: "제목을 입력해주세요." },
                        { min: 5, max: 50, message: "제목은 5자 이상 50자 이하로 입력해주세요." },
                    ]}
                >
                    <Input placeholder="제목을 입력하세요" />
                </Form.Item>

                <Form.Item
                    name="contents"
                    label="내용"
                    rules={[
                        { required: true, message: "내용을 입력해주세요." },
                        { min: 5, max: 2000, message: "내용은 5자 이상 2000자 이하로 입력해주세요." },
                    ]}
                >
                    <Input.TextArea rows={10} placeholder="내용을 입력하세요" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        등록
                    </Button>
                    <Button style={{ marginLeft: "10px" }} onClick={() => navigate(-1)}>
                        취소
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PostCreateTemplate;
