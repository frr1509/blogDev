import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../../selecrtors";
import { addCommentAsync } from "../../../../actions";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constans";

const CommentsConteiner = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState("");

    const roleId = useSelector(selectUserRole);

    const dispatch = useDispatch();

    const onNewCommentAdd = (postId, content) => {
        dispatch(addCommentAsync(postId, content));
        setNewComment("");
    };

    const isGuest = checkAccess([ROLE.GUEST], roleId);

    return (
        <div className={className}>
            {!isGuest && (
                <div className="new-comment">
                    <textarea
                        name="comment"
                        value={newComment}
                        placeholder="Коментарий..."
                        onChange={({ target }) => setNewComment(target.value)}
                    ></textarea>
                    <Icon
                        id="fa-paper-plane-o"
                        size="21px"
                        margin="0 0 0 10px"
                        onClick={() =>
                            onNewCommentAdd(postId, newComment)
                        }
                    />
                </div>
            )}
            <div className="comments">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        postId={postId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsConteiner)`
    width: 580px;
    margin: 0 auto;

    & .new-comment {
        display: flex;
        width: 100%;
        margin: 20px 0 0;
    }

    & .new-comment textarea {
        resize: none;
        width: 550px;
        height: 120px;
        font-size: 18px;
    }
`;
