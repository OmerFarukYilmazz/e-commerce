import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/actions/orderActions';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.order);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders?.map(order => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            {/* Order Header */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">${order.price}</span>
                {expandedOrder === order.id ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <div className="p-4 border-t">
                {/* Products */}
                <div className="space-y-4">
                  {order.products?.map(product => (
                    <div key={product.id} className="flex items-center gap-4">
                      <img 
                        src={product.images?.[0]?.url} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.count}
                        </p>
                        {product.detail && (
                          <p className="text-sm text-gray-600">
                            Details: {product.detail}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.price * product.count}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                {order.address && (
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p>{order.address.name} {order.address.surname}</p>
                    <p>{order.address.phone}</p>
                    <p>
                      {order.address.neighborhood}, {order.address.district}, 
                      {order.address.city}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;