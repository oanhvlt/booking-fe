export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DOCTOR_DETAILS: '/doctor-details/:id',
    SPECIALTY_DETAILS: '/specialty-details/:id',
    CLINIC_DETAILS: '/clinic-details/:id',
    VERIFY_EMAIL_BOOKING: '/verify-booking',

};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};
 
//use this const in "UserRedux.js"
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const DATE_FORMAT = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3',
}