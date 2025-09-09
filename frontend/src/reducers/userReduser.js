import { ACTION_TYPE } from "../actions";
import { ROLE } from "../constans/roleId";

const initialUserState = {
    id: null,
    roleId: ROLE.GUEST,
    session: null,
    login: null,
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case ACTION_TYPE.LOGOUT:
            return initialUserState;
        default:
            return state;
    }
};
