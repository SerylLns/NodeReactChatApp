import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (uid, data) => {
  return (dispatch) => {
   return axios({
     url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
     method: "PATCH",
     data
   }).then(res => {
     dispatch({ type: UPDATE_USER, payload: res.data })
   }).catch((err) => console.log(err));
 }  
}