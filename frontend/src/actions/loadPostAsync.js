import { request } from "../utils";
import { setPostData } from "./setPostData";

export const LoadPostAsync = (PostId) => (dispatch) =>
    request(`/api/posts/${PostId}`).then((postData) => {
        if (postData.data) {
            dispatch(setPostData(postData.data));
        }

        return postData;
    });
