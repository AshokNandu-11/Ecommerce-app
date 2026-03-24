import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  const addProduct = async () => {
    setLoading(true);
    await API.post("/products", newProduct);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {role === "ADMIN" && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <input
            className="border p-2 w-full mb-2"
            placeholder="Name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            placeholder="Description"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            placeholder="Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      )}

      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {products.length === 0 ? (
              <p className="text-gray-500">No products available</p>
            ) : (
              products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-3 shadow rounded flex justify-between"
                >
                  <span>
                    {p.name} - ₹{p.price}
                  </span>

                  {role === "ADMIN" && (
                    <button
                      className="bg-red-500 text-white px-3 rounded"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
