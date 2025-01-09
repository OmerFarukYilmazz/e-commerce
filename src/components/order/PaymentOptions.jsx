import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../../store/actions/shoppingCartAction';
import CreditCardForm from './CreditCardForm';
import SavedCards from './SavedCards';
import { fetchCards } from '../../store/actions/shoppingCartAction';

const PaymentOptions = () => {
  const dispatch = useDispatch();
  const [showCardForm, setShowCardForm] = useState(false);
  const selectedPaymentMethod = useSelector(state => state.shoppingCart.paymentMethod);
  const savedCards = useSelector(state => state.shoppingCart.cards);
  const selectedCard = useSelector(state => state.shoppingCart.selectedCard);

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' }
  ];

  const handleMethodSelect = (method) => {
    if (method.id === 'credit_card') {
      // Kredi kartı seçildiğinde, önceden seçili bir kart varsa onu kullan
      dispatch(setPaymentMethod({
        ...method,
        selectedCard: selectedCard
      }));
    } else {
      // Diğer ödeme yöntemleri için sadece yöntemi ayarla
      dispatch(setPaymentMethod(method));
    }
  };
  // Component mount olduğunda veya kartlar değiştiğinde
  useEffect(() => {
    // Eğer seçili kart varsa ve ödeme yöntemi credit card ise
    if (selectedCard && selectedPaymentMethod?.id === 'credit_card') {
      dispatch(setPaymentMethod({
        id: 'credit_card',
        selectedCard: selectedCard
      }));
    }
  }, [selectedCard, dispatch]);

  // Kartları yükle
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);


  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Options</h1>
      
      {/* Payment Methods */}
      <div className="grid gap-4 mb-8">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer
              ${selectedPaymentMethod?.id === method.id 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
              }`}
            onClick={() => handleMethodSelect(method)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <span className="font-semibold">{method.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Credit Card Section */}
      {selectedPaymentMethod?.id === 'credit_card' && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Credit Card Information</h2>
            <button
              onClick={() => setShowCardForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add New Card
            </button>
          </div>

          {/* Saved Cards */}
          <SavedCards />

          {/* Add/Edit Card Form */}
          {showCardForm && (
            <CreditCardForm
              onClose={() => setShowCardForm(false)}
              onSubmit={() => {
                setShowCardForm(false);
                // Refresh saved cards
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;