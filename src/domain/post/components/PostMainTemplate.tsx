import { List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CommonPagingResponse } from "../../../common/types/CommonTypes";
import { postApi, type PostPagingRequest } from "../service/postApi";
import { postCategoryApi, type PostCategoryResponse } from "../service/postCategoryApi";
import type { PostResponse } from "../types/PostTypes";
import PostTemplate from "./PostTemplate";

function PostMainTemplate() {
    const [postsByCategory, setPostsByCategory] = useState<Record<number, PostResponse[]>>({});
    const [postCategoryList, setPostCategoryList] = useState<PostCategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        postCategoryApi.getPostCategories()
            .then((response) => {
                const categories = response.data.data as PostCategoryResponse[];
                setPostCategoryList(categories);

                const requests = categories.map(c => {
                    const requestBody: PostPagingRequest = {
                        page: 0,
                        size: 5,
                        search: "",
                        keyword: "",
                        memberIdx: 0,
                        categoryIdx: c.idx
                    };
                    return postApi.getPosts(requestBody);
                });

                return Promise.all(requests)
                    .then(results => {
                        const postMap: Record<number, PostResponse[]> = {};
                        results.forEach((res, i) => {
                            const data = res.data.data as CommonPagingResponse;
                            postMap[categories[i].idx] = data.data as PostResponse[];
                        });
                        setPostsByCategory(postMap);
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            {postCategoryList.map((cat) => (
                <div key={cat.idx} style={{ marginBottom: "50px" }}>
                    <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography.Title level={4}>{cat.name}</Typography.Title>
                        <Link to={`/posts/category/${cat.idx}`} style={{ margin: "0" }}>더보기</Link>
                    </Space>
                    <List
                        bordered
                        loading={loading}
                        dataSource={postsByCategory[cat.idx] || []}
                        renderItem={(post) => (
                            <List.Item>
                                <PostTemplate {...post} />
                            </List.Item>
                        )}
                    />
                </div>
            ))}
        </div>
    );
}

export default PostMainTemplate;