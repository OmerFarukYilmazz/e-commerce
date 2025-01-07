import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { updateCartItem, removeFromCart, toggleCartItem } from "../store/actions/shoppingCartAction";
import { useHistory } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector(state => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  // for discount
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
   
  const handleCreateOrder = () => {
    history.push('/order/address');
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  const handleQuantityChange = (productId, newCount) => {
    if (newCount > 0) {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleItem = (productId, checked) => {
    dispatch(toggleCartItem(productId, checked));
  };

  const calculateSubtotal = () => {
    return cart
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 100 ? 0 : 10; 
  const grandTotal = subtotal + shippingCost - appliedDiscount;

  const handleApplyDiscount = () => {
    // Örnek indirim kodları (gerçek uygulamada API'den kontrol edilir)
    const discountCodes = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'SUPER30': 30
    };

    if (discountCodes[discountCode]) {
        setAppliedDiscount(discountCodes[discountCode]);
        setDiscountError('');
      } else {
        setDiscountError('Invalid discount code');
        setAppliedDiscount(0);
      }
      setDiscountCode(''); // Kodu temizle
    };

  // Seçili ürünleri  toplu silme
  /*
  const handleRemoveSelectedItems = () => {
    const selectedProductIds = cart
      .filter(item => item.checked)
      .map(item => item.product.id);
    
    selectedProductIds.forEach(productId => {
      dispatch(removeFromCart(productId));
    });
  };
  */

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <table className="w-full">            
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">
                  <input 
                    type="checkbox" 
                    checked={cart.every(item => item.checked)}
                    onChange={(e) => cart.forEach(item => 
                      handleToggleItem(item.product.id, e.target.checked)
                    )}
                  />
                </th>
                <th className="text-left p-4">Product   </th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product.id} className="border-b">
                  <td className="p-4">
                    <input 
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => handleToggleItem(item.product.id, e.target.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-8">
                      <img 
                        src={item.product.images[0].url} 
                        alt={item.product.name}
                        className="w-20 h-24 object-cover"
                      />
                      <span>{item.product.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{formatPrice(item.product.price)} $</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.count}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">{formatPrice(item.product.price * item.count)} $</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            {/* İndirim Kodu Alanı */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Apply
                </button>
              </div>
              {discountError && (
                <p className="text-red-500 text-sm mt-1">{discountError}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Shipping</span>
                {subtotal >= 100 ? (
                  <span className="text-green-600">Free Shipping</span>
                ) : (
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                )}
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between border-b pb-4">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -${appliedDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${grandTotal.toFixed(2)}</span>
              </div>

              {subtotal < 100 && (
                <p className="text-sm text-gray-500 mt-2">
                  Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                </p>
              )}

              <button 
                onClick={handleCreateOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;