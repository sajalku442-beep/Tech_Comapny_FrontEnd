import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { useEffect } from "react";

const useGetallusers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/all`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          // console.log(res?.data?.users);
          dispatch(setUsers(res?.data?.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchuser();
  }, []);
};



// const getallusers = async (dispatch) => {
//   try {
//     const res = await axios.get(`${USER_API_END_POINT}/all`, {
//       withCredentials: true,
//     });
//     if (res?.data?.success) {
//       console.log(res?.data?.users);
//       dispatch(setUsers(res?.data?.users));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export default useGetallusers;
