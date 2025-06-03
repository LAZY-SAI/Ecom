import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (productData) => {
    try {
      await createProduct(productData);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;