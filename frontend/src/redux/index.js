import {ACTION_INCREMENT} from "./actions";
import produce from 'immer';

const initialState = {
    count: 0
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_INCREMENT:
            return produce(state, draft => {
                draft.count += action.payload.increment;
            });
        default:
            return state;
    }
}

export default rootReducer
