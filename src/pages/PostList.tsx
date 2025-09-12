import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCategoryTab from "../domain/post/components/PostCategoryTab";
import PostListTemplate from "../domain/post/components/PostListTemplate";
import { postCategoryApi, type PostCategoryResponse } from "../domain/post/service/postCategoryApi";

function PostList() {
    const { categoryIdx } = useParams();
    const [categories, setCategories] = useState<PostCategoryResponse[]>([]);

    useEffect(() => {
        postCategoryApi
            .getPostCategories() // 카테고리 불러오는 API 있어야 함
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => console.error("카테고리 불러오기 실패:", err));
    }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <PostCategoryTab categories={categories} />
            <PostListTemplate categoryIdx={categoryIdx} />
        </div>
    );
}

export default PostList;
