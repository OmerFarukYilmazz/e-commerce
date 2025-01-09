import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, deleteCard } from '../../store/actions/shoppingCartAction';
import CreditCardForm from './CreditCardForm';

const SavedCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.shoppingCart.cards) || [];
  const selectedCard = useSelector(state => state.shoppingCart.selectedCard);
  
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // Component mount olduğunda
  useEffect(() => {
    dispatch(fetchCards()).then(() => {
      // Eğer seçili kart yoksa ve kartlar varsa ilk kartı seç
      if (!selectedCard && cards.length > 0) {
        handleCardSelect(cards[0]);
      }
    });
  }, [dispatch]);

  const handleCardSelect = (card) => {
    dispatch({ type: 'SET_SELECTED_CARD', payload: card });
    dispatch({ 
      type: 'SET_PAYMENT_METHOD', 
      payload: { 
        id: 'credit_card', 
        selectedCard: card 
      } 
    });
  };
  const handleEditClick = (e, card) => {
    e.stopPropagation();
    setEditingCard(card);
    setShowEditForm(true);
  };

  const handleDeleteClick = async (e, cardId) => {
    e.stopPropagation();
    try {
      await dispatch(deleteCard(cardId));
      dispatch(fetchCards()); // Kartları yeniden yükle
    } catch (error) {
      console.error('Card delete failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      {cards.map(card => (
        <div
          key={card.id}
          onClick={() => handleCardSelect(card)}
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer
            ${selectedCard?.id === card.id 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
            }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                **** **** **** {card.card_no.slice(-4)}
              </p>
              <p className="text-sm text-gray-600">
                {card.name_on_card}
              </p>
              <p className="text-sm text-gray-500">
                Expires: {card.expire_month}/{card.expire_year}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => handleEditClick(e, card)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDeleteClick(e, card.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {showEditForm && (
        <CreditCardForm
          initialData={editingCard}
          onClose={() => {
            setShowEditForm(false);
            setEditingCard(null);
          }}
          onSubmit={() => {
            setShowEditForm(false);
            setEditingCard(null);
            dispatch(fetchCards()); // Kartları yeniden yükle
          }}
        />
      )}
    </div>
  );
};

export default SavedCards;