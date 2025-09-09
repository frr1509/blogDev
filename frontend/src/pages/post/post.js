import styled from "styled-components";
import { Comments, PostContent, PostForm } from "./components";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { LoadPostAsync, resetPostData } from "../../actions";
import { selectPost } from "../../selecrtors";
import { Error, PrivatContent } from "../../components";
import { ROLE } from "../../constans";

const PostContainer = ({ className }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const post = useSelector(selectPost);

    const params = useParams();
    const isEditing = !!useMatch("/post/:id/edit");
    const isCreating = !!useMatch("/post");

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(resetPostData);
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            return;
        }
        dispatch(LoadPostAsync(params.id)).then((postData) => {
            setError(postData.error);
            setIsLoading(false);
        });
    }, [ params.id, dispatch, isCreating]);

    if (isLoading) {
        return null;
    }

    const SpecificalPostPage =
        isCreating || isEditing ? (
            <PrivatContent access={[ROLE.ADMIN]} serverError={error}>
                <div className={className}>
                    <PostForm post={post} isCreating={isCreating} />
                </div>
            </PrivatContent>
        ) : (
            <div className={className}>
                <PostContent post={post} />
                <Comments comments={post.comments} postId={post.id} />
            </div>
        );

    return error ? <Error error={error} /> : SpecificalPostPage;
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding: 0 80px;
`;
