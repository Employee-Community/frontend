import { Typography } from "antd";
import type { PostResponse } from "../types/PostTypes";
import { Link } from "react-router-dom";

function PostTemplate(post: PostResponse) {
    return (
        <div>
            <Link to={`/posts/${post.idx}`}>
                <Typography.Text underline id={post.idx.toString()}>{post.title}</Typography.Text>
            </Link>
        </div>
    );
}

export default PostTemplate;