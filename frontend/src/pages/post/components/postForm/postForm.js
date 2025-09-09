import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../specialPanel/specialPanel";
import { useRef } from "react";
import { sunitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostAsync } from "../../../../actions";

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
    isCreating,
}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sunitizeContent(contentRef.current.innerHTML);

        dispatch(
            savePostAsync(id,{
                imageUrl: newImageUrl,
                title: newTitle,
                content: newContent,
            }),
        ).then(({ id }) => navigate(`/post/${id}`));
    };

    return (
        <div className={className}>
            <Input
                ref={imageRef}
                defaultValue={isCreating ? null : imageUrl}
                placeholder="Изображение..."
            />
            <Input
                ref={titleRef}
                defaultValue={isCreating ? null : title}
                placeholder="Заголовок..."
            />
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="20px 0"
                editButton={
                    <Icon
                        id="fa-floppy-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={onSave}
                    />
                }
            />
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text"
            >
                {content}
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
    & img {
        float: left;
        margin: 0 20px 10px 0;
    }

    & .post-text {
        font-size: 18px;
        white-space: pre-line;
        min-height: 80px;
        border: 1px solid #000;
    }
`;
