import OrderAddress from './OrderAddress';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentOptions';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../store/actions/shoppingCartAction';

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.shoppingCart.currentStep);
  const selectedAddress = useSelector(state => state.shoppingCart.selectedAddress);
  const selectedPaymentMethod = useSelector(state => state.shoppingCart.selectedPaymentMethod);
  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Step Indicator - Tıklanabilir */}
      <div className="flex items-center justify-center mb-8">
        <div 
          onClick={() => dispatch(setCurrentStep(1))}
          className={`
            flex items-center px-6 py-3 rounded-l-full cursor-pointer
            ${currentStep === 1  // >= yerine === kullanıyoruz
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-500'
            }
          `}
        >
          <span className="mr-2 font-bold">1</span>
          <span>Address Information</span>
        </div>
        <div 
          onClick={() => dispatch(setCurrentStep(2))}
          className={`
            flex items-center px-6 py-3 rounded-r-full cursor-pointer
            ${currentStep === 2  // >= yerine === kullanıyoruz
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-500'
            }
          `}
        >
          <span className="mr-2 font-bold">2</span>
          <span>Payment Options</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentStep === 1 && <OrderAddress />}
          {currentStep === 2 && <PaymentOptions />}
        </div>

        <div className="lg:w-1/3" >
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;