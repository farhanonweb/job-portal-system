import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MyApplications = () => {
  const { axios, navigate } = useContext(AppContext);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await axios.get("/application/student-applications");
      if (data.success) {
        setAppliedJobs(data.applications.filter(a => a.job)); // FIX
      }
    } catch (error) {
      toast.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70">
      <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">
        Applied jobs
      </h1>

      {!appliedJobs.length ? (
        <div className="text-center py-12 text-gray-400">No Job Applied</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Job</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {appliedJobs.map((application) => (
                  <tr
                    key={application._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/job-details/${application.job?._id}`)}
                  >
                    <td className="px-6 py-4">{application.job?.title}</td>
                    <td className="px-6 py-4">{application.job?.company?.name}</td>
                    <td className="px-6 py-4">{application.job?.type}</td>
                    <td className="px-6 py-4">{application.job?.location}</td>
                    <td className="px-6 py-4">{application.job?.salary}</td>
                    <td className="px-6 py-4">{application.status}</td>
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

export default MyApplications;
