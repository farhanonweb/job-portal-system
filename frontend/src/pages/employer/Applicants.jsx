import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Applicants = () => {
  const { axios } = useContext(AppContext);
  const [applicantsData, setApplicantsData] = useState([]);

  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get("/application/employer-job-applicants");
      if (data.success) {
        setApplicantsData(data.applications.filter(a => a.job && a.applicant));
      }
    } catch (error) {
      toast.error("Failed to load applicants");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await axios.put(
        `/application/update-status/${id}`,
        { status }
      );

      if (data.success) {
        fetchApplicants();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">All Applicants</h1>

      {!applicantsData.length ? (
        <div className="text-center text-gray-400 py-12">No Applicants Found</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Applied Job</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Resume</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {applicantsData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{item.applicant.name}</td>
                    <td className="px-6 py-4">{item.applicant.email}</td>
                    <td className="px-6 py-4">{item.applicant.phone}</td>
                    <td className="px-6 py-4">{item.job.title}</td>
                    <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>

                    <td className="px-6 py-4">
                      <a
                        href={`http://localhost:4000/uploads/${item.applicant.resume}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Resume
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        className="px-2 py-1 rounded bg-gray-100"
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
