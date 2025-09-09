import { ACTION_TYPE } from "./actionType";

export const addComment = (comment) => ({
    type: ACTION_TYPE.ADD_COMMENT,
    payload: comment,
});
