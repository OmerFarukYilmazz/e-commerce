import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../../store/actions/shoppingCartAction';

const CreditCardForm = ({ onClose, initialData, onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData || {
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await dispatch(updateCard({ ...formData, id: initialData.id }));
      } else {
        await dispatch(addCard(formData));
      }
      onSubmit();
    } catch (error) {
      console.error('Card save failed:', error);
    }
  };

  return (
    <>
      {/* Overlay tüm sayfayı kaplayacak şekilde en üstte */}
      <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 40 }} />
      
      {/* Form içeriği */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Card' : 'Add New Card'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value={formData.card_no}
              onChange={(e) => setFormData({ ...formData, card_no: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              maxLength="16"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Month
              </label>
              <select
                value={formData.expire_month}
                onChange={(e) => setFormData({ ...formData, expire_month: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Year
              </label>
              <select
                value={formData.expire_year}
                onChange={(e) => setFormData({ ...formData, expire_year: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              value={formData.name_on_card}
              onChange={(e) => setFormData({ ...formData, name_on_card: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div> 

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreditCardForm;