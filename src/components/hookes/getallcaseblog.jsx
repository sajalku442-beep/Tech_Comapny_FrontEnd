import axios from "axios";
import React, { useEffect } from "react";
import { CASEBLOG_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllCaseblogs } from "../redux/caseSlice";

const useGetallcaseblog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCaseBlogs = async () => {
      try {
        const res = await axios.get(`${CASEBLOG_API_END_POINT}/get`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setAllCaseblogs(res?.data?.blogs));
        }
      } catch (error) {
        console.error("Error fetching case blogs:", error);
      }
    };

    fetchCaseBlogs();
  }, []);
};



// const getallcaseblog = async (dispatch) => {
//   try {
//     const res = await axios.get(`${CASEBLOG_API_END_POINT}/get`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     });
//     if (res?.data?.success) {
//       dispatch(setAllCaseblogs(res?.data?.blogs));
//     }
//   } catch (error) {
//     console.error("Error fetching case blogs:", error);
//   }
// };

export default useGetallcaseblog;
