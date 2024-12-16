import Header from "./layout/Header"
import { PageContent } from "./layout/PageContent";
import Footer from "./layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store/actions/clientAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] m-auto">
      <Header />
      <PageContent />       
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
