import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets"; 
import toast from "react-hot-toast";

const JobDetails = () => {
  const { jobsData, isJobApplied, setIsJobApplied, saveJob, axios } = useContext(AppContext);
  const { id } = useParams();

  
  const job = jobsData.find((job) => job._id === id);

  
  if (!job) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  const handleApplyJob = async (id) => {
    try {
      const { data } = await axios.post("http://localhost:4000/application/apply", {
        jobId: id,
      });
      if (data.success) {
        setIsJobApplied(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl text-gray-800 font-semibold">
        Job Details
      </h1>

      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10 gap-10">
        {/* left section */}
        <div className="flex flex-col ">
          <div className="flex items-center gap-5">
            <img
              src={`http://localhost:4000/uploads/${job.company.logo}`} 
              alt=""
              className="w-[86px] h-[86px] object-cover rounded"
            />
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">{job.title}</h2>
              <p className="text-xs sm:text-base">
                at {job.company.name}{" "}
                <span className="bg-green-200/40 p-1 rounded ml-2">
                  {job.type}
                </span>
              </p>
            </div>
          </div>

          {/* job description */}
          <div className="my-2 flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Description
            </h4>
            <p>{job.description}</p>
          </div>

          {/* job requirements */}
          <div className="my-1 flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">Job Requirements</h4>
            <ul className="list-disc pl-5">
              {job.requirements && job.requirements.length > 0 ? (
                job.requirements.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No requirements listed</li>
              )}
            </ul>
          </div>

          {/* job benefits */}
         
<div>
  <h4 className="text-lg font-semibold text-gray-800">Job Benefits</h4>
  <ul className="list-disc pl-5">
    {job.benefits && job.benefits.length > 0 ? (
      job.benefits.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))
    ) : (
      <li className="text-gray-500">No benefits listed</li>
    )}
  </ul>
</div>

        </div>

        {/* right section */}
        <div className="flex flex-col">
          <div className="flex gap-4">
            <div onClick={() => saveJob(job)}>
              <img
                src={assets.save_later_icon}
                alt=""
                className="cursor-pointer"
              />
            </div>
            {/* ✅ Button Fixed */}
            <button
              onClick={() => handleApplyJob(job._id)}
              disabled={isJobApplied}
              className={`cursor-pointer px-10 py-2 rounded-full font-medium transition ${
                isJobApplied
                  ? "bg-gray-400 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isJobApplied ? "Applied" : "Apply Now"}
            </button>
          </div>

          {/* job salary */}
          <div className="my-5 flex flex-wrap gap-3 border border-gray-300 p-4">
            <p className="text-base text-gray-800 font-medium">
              Salary :${job.salary}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-base text-gray-800 font-medium">
                Job Location:
              </p>
              <p>{job.location}</p>
            </div>
          </div>

          {/* job overview */}
          <div className="my-1 flex flex-col gap-3 border border-gray-300 p-4">
            <p className="text-xl text-gray-800 font-bold">Job Overview</p>
            <div className="flex flex-wrap items-center gap-2">
              <p>
                posted date :
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>job level :{job.jobLevel}</p>
              <p>Education :{job.education}</p>
              <p>Experience :{job.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
