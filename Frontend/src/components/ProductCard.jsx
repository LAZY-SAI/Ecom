import { Link } from 'react-router-dom';
import { deleteProduct } from '../api';

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      onDelete(product._id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
        <div className="mt-4 flex justify-between">
          <Link
            to={`/edit-product/${product._id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;