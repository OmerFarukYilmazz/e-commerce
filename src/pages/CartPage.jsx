import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { updateCartItem, removeFromCart, toggleCartItem } from "../store/actions/shoppingCartAction";


const CartPage = () => {
  const cart = useSelector(state => state.shoppingCart.cart);
  const dispatch = useDispatch();

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

  const calculateTotal = () => {
    return formatPrice(cart
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0));
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

        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Selected Products ({cart.filter(item => item.checked).length})</span>
                <span>{formatPrice(calculateTotal())} $</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())} $</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;