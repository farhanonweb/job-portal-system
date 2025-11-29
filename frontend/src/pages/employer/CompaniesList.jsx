import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CompaniesList = () => {
  const { navigate, axios } = useContext(AppContext);
  const [companyData, setCompanyData] = useState([]);

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/company/get-employer-companies",
        { withCredentials: true } 
      );

      if (data.success) {
        setCompanyData(data.companies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/company/delete/${id}`,
        { withCredentials: true } 
      );

      if (data.success) {
        setCompanyData((prev) => prev.filter((c) => c._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-4xl w-full px-6 mx-auto mt-10 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Company List</h2>
        <button
          onClick={() => navigate("/employer/add-company")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add company
        </button>
      </div>

      <table className="w-full border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Logo</th>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">About</th>
            <th className="text-left p-3 border-b">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {companyData.map((company) => (
            <tr key={company._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                <img
                  src={`http://localhost:4000/uploads/${company.logo}`}
                  alt=""
                  className="w-16 h-16 object-cover border"
                />
              </td>
              <td className="p-3 border-b">{company.name}</td>
              <td className="p-3 border-b">{company.about}</td>
              <td className="p-3 border-b">
                <button
                  onClick={() => handleDelete(company._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesList;
