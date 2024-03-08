import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

//gọi action from 'appActions.js'
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }

        //check action language (click VN or EN) to change language
        case actionTypes.CHANGE_LANGUAGE: 
        //object action (changeLanguageApp) export form appActions.js (return: type, language)
        //console.log('hdit check redux:', action);
        return {
            ...state,
            language: action.language 
        }

        default:
            return state;
    }
}

export default appReducer;