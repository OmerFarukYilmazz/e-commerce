import { useForm } from 'react-hook-form';

const AddressForm = ({ initialData, onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: ''
    }
  });

  return (
    <>
      {/* Overlay tüm sayfayı kaplayacak şekilde en üstte */}
      <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 40 }} />
      
      {/* Form içeriği */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Adres Başlığı</label>
            <input
              {...register('title', { required: 'Adres başlığı gerekli' })}
              className="w-full p-2 border rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ad</label>
              <input
                {...register('name', { required: 'Ad gerekli' })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Soyad</label>
              <input
                {...register('surname', { required: 'Soyad gerekli' })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefon</label>
            <input
              {...register('phone', { required: 'Telefon gerekli' })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">İl</label>
            <select
              {...register('city', { required: 'İl seçimi gerekli' })}
              className="w-full p-2 border rounded"
            >
              <option value="">Seçiniz</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              {/* Diğer şehirler */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">İlçe</label>
            <input
              {...register('district', { required: 'İlçe gerekli' })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mahalle</label>
            <textarea
              {...register('neighborhood', { required: 'Adres detayı gerekli' })}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddressForm;