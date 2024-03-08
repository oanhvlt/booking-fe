import axios from "../axios";
let handleLoginApi = (userEmail, userPassword)=>{
    return axios.post('/api/login', {
        email: userEmail, 
        password: userPassword
    });
}

// const getUsers = (inputId) => {
//     return axios.get(`/api/get-users?id=${inputId}`);
// }

const getAllUsers = () => {
    return axios.get(`/api/get-all-users`);
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}

const editSummaryUserService = (inputData) => {
    return axios.put(`/api/edit-summary-user`, inputData);
}


const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
}


// const deleteUserService = (userId) => {
//     return axios.delete(`/api/delete-user?id=${userId}`);
// }

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorsHomeService = (limit) =>{
    return axios.get(`/api/top-doctors-home?limit=${limit}`);
}

const getAllDoctorsService = () =>{
    return axios.get(`/api/get-all-doctors`);
}

const saveInfoDoctorService = (data) =>{
    return axios.post(`/api/save-doctor-details`, data);
}

const getDoctorDetailsService = (id) =>{
    return axios.get(`/api/get-doctor-details-by-id?id=${id}`);
}

const saveBulkScheduleService = (data) =>{
    return axios.post(`/api/bulk-create-schedule`, data);
}
//get-schedule-by-date
const getScheduleByDateService = (doctorId, date) =>{
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}
//getExtraInfoDoctorById
const getExtraInfoDoctorByIdService = (doctorId) =>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

//getProfileDoctorById
const getProfileDoctorByIdService = (doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
//patient-book-appointment
const bookAppointmentService = (data) =>{
    return axios.post(`/api/patient-book-appointment`, data);
}
//verify-book-appointment
const verifyBookAppointmentService = (data) =>{
    return axios.post(`/api/verify-book-appointment`, data);
}
//save-specialty
const saveSpecialtytService = (data) =>{
    return axios.post(`/api/save-specialty`, data);
}
//get-all-specialties
const getAllSpecialtiesService = () => {
    return axios.get(`/api/get-all-specialties`);
}

//get-specialty-doctor-by-id
const getSpecialtyDoctorByIdService = (data) =>{
    return axios.get(`/api/get-specialty-doctor-by-id?id=${data.id}&location=${data.location}`);
}

//save-clinic
const saveClinictService = (data) =>{
    return axios.post(`/api/save-clinic`, data);
}

//get-all-clinic
const getAllClinicsService = () => {
    return axios.get(`/api/get-all-clinics`);
}

//get-clinic-doctor-by-id
const getClinicDetailsByIdService = (data) =>{
    return axios.get(`/api/get-clinic-doctor-by-id?id=${data.id}`);
}
//get-list-patient-for-doctor
const getListPatientForDoctorService = (data) =>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

//send-remedy
const sendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data);
}

export {
    handleLoginApi,
    getAllUsers,
    //getUsers,
    createNewUserService,
    deleteUserService,
    editSummaryUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorsHomeService,
    getAllDoctorsService,
    saveInfoDoctorService,
    getDoctorDetailsService,
    saveBulkScheduleService,
    getScheduleByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    bookAppointmentService,
    verifyBookAppointmentService,
    saveSpecialtytService,
    getAllSpecialtiesService,
    getSpecialtyDoctorByIdService,
    saveClinictService,
    getAllClinicsService,
    getClinicDetailsByIdService,
    getListPatientForDoctorService,
    sendRemedyService
}

