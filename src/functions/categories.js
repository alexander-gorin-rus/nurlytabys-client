import axios from "axios";

export const GetOneCategoryToUpdate = async (slug) => {
    await axios.get(`${process.env.REACT_APP_API}/get-category-to-update/${slug}`)         
}