import { useDispatch } from "react-redux";
import { METHODS, sendRequest } from "../util/axiosUtil";
import { 
  setLoading, 
  setError, 
  setProducts, 
  setTotal 
} from "../store/slices/productSlice.jsx";

const useAxios = () => {
  const dispatch = useDispatch();

  const fetchProducts = async ({
    category = null,
    filter = null,
    sort = null,
    limit = 20,
    offset = 0,
  }) => {
    dispatch(setLoading(true));
    
    try {
      const data = await sendRequest({
        url: "/products",
        method: METHODS.GET,
        category,
        filter,
        sort,
        limit,
        offset,
      });
      
      dispatch(setProducts(data.products));
      dispatch(setTotal(data.total));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchProducts, METHODS };
};

export default useAxios;