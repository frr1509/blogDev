import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
    CLOSE_MODAL,
    openModal,
    removeCommentAsync,
} from "../../../../../../actions";
import { ROLE } from "../../../../../../constans";
import { selectUserRole } from "../../../../../../selecrtors";

const CommentContainer = ({
    className,
    postId,
    id,
    author,
    content,
    publishedAt,
}) => {
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    const onCommentRemove = (id) => {
        dispatch(
            openModal({
                text: "Удалить комментарий?",
                onConfirm: () => {
                    dispatch(removeCommentAsync(postId, id));
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    };

    const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(roleId);

    return (
        <div className={className}>
            <div className="comment">
                <div className="info-panel">
                    <div className="author">
                        <Icon
                            id="fa-user-circle-o"
                            size="18px"
                            margin="0 10px 0 0"
                            onClick={() => {}}
                        />
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon
                            id="fa-calendar-o"
                            size="18px"
                            margin="0 10px 0 0"
                            onClick={() => {}}
                        />
                        {publishedAt}
                    </div>
                </div>
                <div className="comment-text">{content}</div>
            </div>
            {isAdminOrModerator && (
                <Icon
                    id="fa-trash-o"
                    size="21px"
                    margin="0 0 0 10px"
                    onClick={() => onCommentRemove(id)}
                />
            )}
        </div>
    );
};

export const Comment = styled(CommentContainer)`
    display: flex;
    width: 100%;
    margin-top: 10px;

    & .comment {
        padding: 5px 10px;
        width: 550px;
        border: 1px solid #000;
    }

    & .info-panel {
        display: flex;
        justify-content: space-between;
    }

    & .author {
        display: flex;
    }

    & .published-at {
        display: flex;
    }
`;
