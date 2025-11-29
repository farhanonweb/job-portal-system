import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";


const PostJob = () => {

const {navigate, axios, user} = useContext(AppContext);

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    requirements: [],
    benefits: [],
    jobLevel: "",
    education: "",
    experience: "",
  });

  
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const [companies, setCompanies] = useState([]);
  const fetchCompanies= async() =>{
    try{
      const {data} = await axios.get("http://localhost:4000/company/get-employer-companies");
            if(data.success){
              setCompanies(data.companies);
            } else {
              toast.error(data.message);
            }
    } catch (error){
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    
        fetchCompanies();
    
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
           const {data}=await axios.post("http://localhost:4000/job/post",
            jobData
           );
           if(data.success){
            toast.success(data.message);
            navigate("/employer/jobs-list");
           } else{
            toast.error(data.message);
           }
    } catch (error){
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-w-3xl w-full mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Post a New Job
      </h2>

   

    
      

      {/* Job Title */}
      <label>Job Title</label>
      <input
        type="text"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        placeholder="Enter job title"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/* Company Name */}
      <label>Company Name</label>
      <select name="company" onChange={handleChange} value={jobData.company}className="w-full border mt-1 border-gray-500/30
       focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4 cursor-pointer">
        <option value="">Select a company</option>
        {
          companies.map((company)=>(
            <option key={company._id} value={company._id}>{company.name}</option>
          ))
        }
       </select>

      {/* Description */}
      <label>Job Description</label>
      <textarea
        name="description"
        value={jobData.description}
        onChange={handleChange}
        rows="3"
        placeholder="Describe the job role"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/* Location */}
      <label>Location</label>
      <input
        name="location"
        value={jobData.location}
        onChange={handleChange}
        type="text"
        placeholder="Job Location"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/* Salary */}
      <label>Salary</label>
      <input
        name="salary"
        value={jobData.salary}
        onChange={handleChange}
        type="text"
        placeholder="e.g. $80,800"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Job Type */}
      <label>Job Type</label>
      <select
        name="type"
        value={jobData.type}
        onChange={handleChange}
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      >
        <option value="">Select Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Remote">Remote</option>
        <option value="Internship">Internship</option>
      </select>

      {/* Requirements */}
      <label>Requirements</label>
      <textarea
        name="requirements"
        value={jobData.requirements}
        onChange={handleChange}
        rows="2"
        placeholder="Separate with commas"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Benefits */}
      <label>Benefits</label>
      <textarea
        name="benefits"
        value={jobData.benefits}
        onChange={handleChange}
        rows="2"
        placeholder="Separate with commas"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Job Level */}
      <label>Job Level</label>
      <input
        name="jobLevel"
        value={jobData.jobLevel}
        onChange={handleChange}
        type="text"
        placeholder="e.g. Senior, Mid-Level"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Education */}
      <label>Education</label>
      <input
        name="education"
        value={jobData.education}
        onChange={handleChange}
        type="text"
        placeholder="e.g. Bachelor's Degree"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Experience */}
      <label>Experience</label>
      <input
        name="experience"
        value={jobData.experience}
        onChange={handleChange}
        type="text"
        placeholder="e.g. 3 years"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full my-3 bg-blue-600 hover:bg-blue-700 active:scale-95 transition py-2.5 rounded text-white"
      >
        Post Job
      </button>
    </form>
  );
};

export default PostJob;
