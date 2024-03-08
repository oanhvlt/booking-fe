import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    allDoctors:[],
    topDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    let copyState = {};
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:   
            copyState = {...state};
            copyState.isLoadingGender = true;
            //console.log('fire FETCH_GENDER_START: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:    
            copyState = {...state};
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            //console.log('fire FETCH_GENDER_SUCCESS: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            copyState = {...state};
            copyState.genders = [];
            copyState.isLoadingGender = false;
            //console.log('fire FETCH_GENDER_FAILED: ', action)
            
            return {
                ...copyState,
            }
        
        //role
        case actionTypes.FETCH_ROLE_SUCCESS:    
            copyState = {...state};
            copyState.roles = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            copyState = {...state};
            copyState.roles = [];
            return {
                ...copyState,
            }
        //position
        case actionTypes.FETCH_POSITION_SUCCESS:    
            copyState = {...state};
            copyState.positions = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            copyState = {...state};
            copyState.positions = [];
            return {
                ...copyState,
            }
       
         //manage user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:    
            state.users = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED: 
            state.users = [];
            return {
                ...state,
            }
        //manage doctos
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:    
            state.allDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED: 
            state.allDoctors = [];
            return {
                ...state,
            }
        //    //top doctors
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:    
            state.topDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED: 
            state.topDoctors = [];
            return {
                ...state,
            }
        
        //allCode > TIME
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:    
            state.allScheduleTime = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 
            state.allScheduleTime = [];
            return {
                ...state,
            }
        //doctor_info   
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:    
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED: 
            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;