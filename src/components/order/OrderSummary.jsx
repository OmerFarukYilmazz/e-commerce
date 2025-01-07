import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from '../../store/actions/shoppingCartAction';


const OrderSummary = () => {
  const cart = useSelector(state => state.shoppingCart.cart || []);
  const selectedAddress  = useSelector(state => state.shoppingCart.selectedAddress); // address key'ini kontrol et
  const selectedPaymentMethod = useSelector(state => state.shoppingCart.paymentMethod);
  const currentStep = useSelector(state => state.shoppingCart.currentStep);
  const dispatch = useDispatch();
  console.log(selectedAddress);
  console.log(selectedPaymentMethod);

  // Seçili ürünlerin toplam tutarı
  const calculateSubtotal = () => {
    if (!Array.isArray(cart)) return 0;
    
    return cart
      .filter(item => item.checked)
      .reduce((total, item) => {
        const price = item.product?.price || 0;
        const count = item.count || 0;
        return total + (price * count);
      }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 150 ? 0 : 29.99;
  const total = subtotal + shippingCost;

  // Eğer cart boşsa veya undefined ise
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  // Her iki seçim de yapılmış mı kontrol et
  const canComplete = selectedAddress && selectedPaymentMethod;

  const handleComplete = () => {
    if (canComplete) {
      // Siparişi tamamla
      console.log('Order completed!', {
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        cart: cart
      });
    }
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      dispatch(setCurrentStep(2));
    } else if (currentStep === 2) {
      // Siparişi tamamla
      console.log('Order completed!');
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      {/* Selected Products */}
      <div className="space-y-4 mb-6">
        {cart
          .filter(item => item.checked)
          .map(item => (
            <div key={item.product?.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
              <img 
                src={item.product?.images?.[0].url} 
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.product?.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.count}</p>
                <p className="text-sm font-semibold text-blue-600">
                  ${((item.product?.price || 0) * (item.count || 0)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Selected Address */}
      {selectedAddress && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
          <p className="text-sm font-medium">{selectedAddress.title}</p>
          <p className="text-sm text-gray-600">
            {selectedAddress.name} {selectedAddress.surname}
          </p>
          <p className="text-sm text-gray-600">
            {selectedAddress.neighborhood}, {selectedAddress.district}, {selectedAddress.city}
          </p>
        </div>
      )}

      {/* Price Details */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {subtotal >= 150 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span>${shippingCost.toFixed(2)}</span>
          )}
        </div>

        {subtotal < 150 && (
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            Add ${(150 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t pt-4 text-gray-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Continue Button */}
      <button 
        onClick={handleComplete}
        disabled={!canComplete}
        className={`w-full py-4 rounded-lg font-semibold
          ${canComplete 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
      >
        Complete Order
      </button>
    </div>
  );
};

export default OrderSummary;