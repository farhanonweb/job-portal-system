import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";

const Jobs = () => {
    const {jobsData}=useContext(AppContext);
    return <div className="py-16">
         <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
        Featured Jobs
      </h1>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-12">
        {
            jobsData.map((job)=>(
                <JobCard  key={job._id} job={job}/>
            )
            )
        }
      </div>
    </div>;
};

export default Jobs;