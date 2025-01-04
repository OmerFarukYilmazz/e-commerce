import { Link } from 'react-router-dom';

const CartDropdown = ({ cart, onClose }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      const discount = parseFloat(item.product.discount_percent) || 0;
      const discountedPrice = price * (1 - discount / 100);
      return total + (discountedPrice * item.count);
    }, 0);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4"
      onMouseEnter={(e) => {
        // Mouse dropdown içindeyken kapanmasını engelle
        e.stopPropagation();
      }}
    >
      <div className="max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 className="font-medium">My Cart</h3>
          <span className="text-sm text-gray-500">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="flex gap-4 mb-4 p-2 border-b">
              <img 
                src={item.product.images[0].url} 
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.count}</p>
                <p className="text-sm font-medium">
                  ${(item.product.price * (1 - (item.product.discount_percent || 0) / 100)).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {cart.length > 0 && (
        <>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/cart" 
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-center text-sm"
                onClick={onClose}
              >
                View Cart
              </Link>
              <Link 
                to="/checkout" 
                className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-center text-sm"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;