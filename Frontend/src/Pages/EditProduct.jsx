import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../api.js';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProducts();
        const foundProduct = response.data.find((p) => p._id === id);
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (productData) => {
    try {
      await updateProduct(id, productData);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
};

export default EditProduct;