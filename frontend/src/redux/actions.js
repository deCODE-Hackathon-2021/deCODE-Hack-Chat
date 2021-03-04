export const ACTION_INCREMENT = 'increment';

export const incrementCounterAction = (increment) => ({
    type: ACTION_INCREMENT,
    payload: {
        increment
    }
})
