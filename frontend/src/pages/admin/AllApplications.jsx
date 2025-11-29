import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AllApplications = () => {
    const {applicantsData}=useContext(AppContext);

    return (
          <div className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70">
       <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">All Applicants</h1>
       {!applicantsData || applicantsData.legnth === 0 ? (
        <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
                No Applicants Found
                 </div>
             
             </div>
       ) : <div className="bg-white rounded-lg shadow-sm border border-gray overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead  className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phome 
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume
                        </th>


                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            AppliedJob
                        </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Application Date
                        </th>

                        

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        applicantsData.map((item,index) =>(
      <tr  
      className="hover:bg-gray-50 transition-colors hover:cursor-pointer"
     
                            key={index}>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.applicant.name}
                                    </div>
                                </td>

                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.applicant.email}
                                    </div>
                                </td>

                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.applicant.phone}
                                    </div>
                                </td>
                                
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                       <a 
                                       href={`http://localhost:4000/uploads/${item.applicant.resume}`}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-blue-600 underline"
                                       >
                                        Resume
                                        </a>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.job.title}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                       {new Date(item.createdAt).toLocaleDateString({
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                       })}
                                    </div>
                                </td>

                              
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}>
                                          {item.status}
                                    </span>
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
export default AllApplications;