import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./slices/counterSlice";
import { addProduct, removeProduct, editProduct } from "./slices/todoSlice";

const App = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
  });
  const [editProductState, setEditProductState] = useState({
    index: null,
    productName: "",
    quantity: "",
    price: "",
  });
  const [isActive, setIsActive] = useState("product");
  const counts = useSelector((state) => state.Counter.value);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (
      product.productName.trim() !== "" &&
      product.quantity.trim() !== "" &&
      product.price.trim() !== ""
    ) {
      dispatch(addProduct(product));
      setProduct({ productName: "", quantity: "", price: "" });
    }
  };

  const handleRemoveProduct = (i) => {
    dispatch(removeProduct(i));
  };

  const handleEditProduct = (i, product) => {
    setEditProductState({ index: i, ...product });
  };

  const handleSaveEditProduct = () => {
    if (
      editProductState.productName.trim() !== "" &&
      editProductState.quantity.trim() !== "" &&
      editProductState.price.trim() !== ""
    ) {
      dispatch(
        editProduct({
          index: editProductState.index,
          newProduct: editProductState,
        })
      );
      setEditProductState({
        index: null,
        productName: "",
        quantity: "",
        price: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-6">
          {isActive === "product" ? "Product App" : "Counter App"}
        </h3>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsActive("counter")}
            className={`py-2 px-4 rounded ${
              isActive === "counter"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            Launch counter app
          </button>
          <button
            className={`py-2 px-4 rounded ${
              isActive === "product"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => setIsActive("product")}
          >
            Launch product app
          </button>
        </div>
        <div className="flex justify-center">
          {isActive === "product" ? (
            <div className="w-full">
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <input
                  placeholder="Product Name"
                  onChange={(e) =>
                    setProduct({ ...product, productName: e.target.value })
                  }
                  value={product.productName}
                  className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0"
                />
                <input
                  placeholder="Quantity"
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  value={product.quantity}
                  className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0"
                  type="number"
                />
                <input
                  placeholder="Price"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  value={product.price}
                  className="w-full md:w-1/3 p-2 border rounded"
                  type="number"
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded mb-4"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
              {editProductState.index !== null && (
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  <input
                    placeholder="Product Name"
                    onChange={(e) =>
                      setEditProductState({
                        ...editProductState,
                        productName: e.target.value,
                      })
                    }
                    value={editProductState.productName}
                    className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0"
                  />
                  <input
                    placeholder="Quantity"
                    onChange={(e) =>
                      setEditProductState({
                        ...editProductState,
                        quantity: e.target.value,
                      })
                    }
                    value={editProductState.quantity}
                    className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0"
                    type="number"
                  />
                  <input
                    placeholder="Price"
                    onChange={(e) =>
                      setEditProductState({
                        ...editProductState,
                        price: e.target.value,
                      })
                    }
                    value={editProductState.price}
                    className="w-full md:w-1/3 p-2 border rounded"
                    type="number"
                  />
                  <button
                    className="w-full bg-green-500 text-white py-2 rounded mt-2 md:mt-0"
                    onClick={handleSaveEditProduct}
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4">Product Name</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4">Price</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, i) => (
                      <tr key={i} className="text-center">
                        <td className="py-2 px-4 whitespace-nowrap">
                          {item.productName}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          <button
                            className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                            onClick={() => handleEditProduct(i, item)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white py-1 px-2 rounded"
                            onClick={() => handleRemoveProduct(i)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : isActive === "counter" ? (
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => dispatch(decrement())}
              >
                -
              </button>
              <div className="text-2xl font-bold">{counts}</div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => dispatch(increment())}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
