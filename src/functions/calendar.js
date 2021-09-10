import axios from "axios";

export const CreateBusiness = async (variables) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}/business-create`, variables);
        
    } catch (err) {
        console.log(err)
    }
}

export const CreateEmployeeBusiness = async (variables) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}/create-employee-business`, variables);
        
    } catch (err) {
        console.log(err)
    }
}

export const GetEmployeeBusiness = async (id) => {
    try {
        await axios.get(`${process.env.REACT_APP_API}/get-employee-business/${id}`);
        
    } catch (err) {
        console.log(err)
    }
}

// export const ShowBusinessList = async () => {
//     try {
//         await axios.get(`${process.env.REACT_APP_API}/get-all-businesses`);
//     } catch (err) {
//         console.log(err)
//     }
// }