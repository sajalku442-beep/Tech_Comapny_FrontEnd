import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAllinsights } from "../redux/insightSlice";
import { INSIGHT_API_END_POINT } from "../utils/constant";

const useGetAllInsights = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get(`${INSIGHT_API_END_POINT}/get`);
        console.log(res?.data?.insights);

        dispatch(setAllinsights(res?.data?.insights));
      } catch (error) {
        console.log(error);
      }
    };
    fetchInsights();
  }, []);
};



// const getAllInsights = async (dispatch) => {
//   try {
//     const res = await axios.get(`${INSIGHT_API_END_POINT}/get`);
//     console.log(res?.data?.insights);

//     dispatch(setAllinsights(res?.data?.insights));
//   } catch (error) {
//     console.log(error);
//   }
// };

export default useGetAllInsights;
