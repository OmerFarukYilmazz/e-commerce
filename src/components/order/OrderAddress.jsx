import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../store/actions/shoppingCartAction';
import AddressForm from './AddressForm';
import { PlusIcon } from 'lucide-react';
import { setSelectedAddress } from '../../store/actions/shoppingCartAction';


const OrderAddress = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.shoppingCart.addresses) || [];
  const selectedAddress = useSelector(state => state.shoppingCart.selectedAddress);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Component mount olduğunda Redux'taki seçili adresi local state'e yükle
  useEffect(() => {
    dispatch(fetchAddresses());
    if (selectedAddress) {
      setSelectedShippingAddress(selectedAddress);
    }
  }, [dispatch, selectedAddress]);

  
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    try {
      if (editingAddress) {
        await dispatch(updateAddress({ ...data, id: editingAddress.id }));
      } else {
        await dispatch(addAddress(data));
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Address save failed:', error);
    }
  };

  // Shipping address seçildiğinde Redux store'a kaydet
  const handleShippingAddressSelect = (address) => {
    setSelectedShippingAddress(address);
    dispatch(setSelectedAddress(address)); // Redux store'a kaydet
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Address Information</h1>

      {/* Shipping Address */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
          <button
            onClick={() => {
              setEditingAddress(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Address
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <div 
              key={address.id} 
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                ${selectedShippingAddress?.id === address.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleShippingAddressSelect(address)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{address.title}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingAddress(address);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteAddress(address.id));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{address.name} {address.surname}</p>
              <p className="text-gray-600">{address.phone}</p>
              <p className="text-gray-600">
                {address.neighborhood}, {address.district}, {address.city}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Billing Address</h2>
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            Same as shipping address
          </label>
        </div>

        {!sameAsShipping && (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map(address => (
              <div 
                key={address.id} 
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                  ${selectedBillingAddress?.id === address.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => setSelectedBillingAddress(address)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{address.title}</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAddress(address);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteAddress(address.id));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{address.name} {address.surname}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-600">
                  {address.neighborhood}, {address.district}, {address.city}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    

      {showForm && (
        <AddressForm
          initialData={editingAddress}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderAddress;