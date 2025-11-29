import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const JobsList=() => {
    const{axios,navigate,user}=useContext(AppContext);
    const [jobsData,setJobsData]=useState([]);
    const fetchMyJobs = async() => {
        try{
                const {data} = await axios.get("http://localhost:4000/job/employer-jobs");
                if(data.success){
                    setJobsData(data.jobs);
                } else{
                    toast.error(data.message);
                }
        } catch(error){
            toast.error(error.response.data.message);
        }
    };

    useEffect(()=>{
        
                fetchMyJobs();      
    },[]);

    const deleteJob= async(id) => {
        try{
            const {data}= await axios.delete(`http://localhost:4000/job/delete/${id}`);
            if(data.success){
                setJobsData(jobsData.filter((job) =>job._id!==id));
                
                
            }  else{
                toast.error(data.message);
            }
        } catch (error){
              toast.error(error.response.data.message);
        }
    }
    return( 
         <div className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70">
       <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">All Jobs</h1>
       {!jobsData || jobsData.length === 0 ? (
        <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
                No Job Found
                 </div>
             
             </div>
       ) : <div className="bg-white rounded-lg shadow-sm border border-gray overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead  className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Details
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>

                        
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        jobsData.map((job,index) =>(
                            <tr  className="hover:bg-gray-50 transition-colors hover:cursor-pointer" onClick={()=>navigate(`/job-details/${job._id}`)}
                            key={index}>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {job.title}
                                    </div>
                                </td>

                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {job.company?.name}
                                    </div>
                                </td>

                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {job.type}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {job.location}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                      $  {job.salary}
                                    </div>
                                </td>

                                    <td className="px-6 py-4 whitespace-nowrap"> 
                                         <button onClick={() => deleteJob(job._id)}  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded cursor-pointer">Delete</button>
                                  </td>                   

                            </tr>
                        ))
                    }
                </tbody>
            </table>
             </div>

         </div>
       }
        </div>
    );
};
export default JobsList;
