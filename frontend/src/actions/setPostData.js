import { ACTION_TYPE } from "./actionType";

export const setPostData = (PostData) => ({
    type: ACTION_TYPE.SET_POST_DATA,
    payload: PostData,
});
