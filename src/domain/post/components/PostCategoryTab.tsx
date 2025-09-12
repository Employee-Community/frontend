import { Button, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import type { PostCategoryResponse } from "../service/postCategoryApi";


type Props = {
    categories: PostCategoryResponse[];
};

function PostCategoryTab({ categories }: Props) {
    const navigate = useNavigate();
    const { categoryIdx } = useParams();

    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <Tabs
                activeKey={categoryIdx}
                onChange={(key) => navigate(`/posts/category/${key}`)}
                items={categories.map((cat) => ({
                    key: String(cat.idx),
                    label: cat.name,
                }))}
            />

            <Button type="primary" onClick={() => navigate("/posts/create")}>
                글쓰기
            </Button>
        </div>
    );
}

export default PostCategoryTab;
