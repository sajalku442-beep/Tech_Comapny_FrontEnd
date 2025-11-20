import axios from "axios";
import { CONTACT_API_END_POINT } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { useEffect } from "react";
import { setAllContacts } from "../redux/contactSlice";

const useGetallcontact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${CONTACT_API_END_POINT}/all`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          console.log(res?.data?.contacts);

          dispatch(setAllContacts(res?.data?.contacts));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
};

// const getallcontact = async (dispatch) => {
//   try {
//     const res = await axios.get(`${CONTACT_API_END_POINT}/all`, {
//       withCredentials: true,
//     });

//     if (res?.data?.success) {
//       console.log(res?.data?.contacts);

//       dispatch(setAllContacts(res?.data?.contacts));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export default useGetallcontact;
