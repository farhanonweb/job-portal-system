import Job from "../models/jobModel.js";


export const postJob = async(req,res)=> {
    try{
        const {id}= req.user;
        const { 
    title,
    company,
    description,
    location,
    salary,
    type,
    requirements,
    benefits,
    jobLevel,
    education,
    experience,
} = req.body;

const job = await Job.create({
    title,
    company,
    description,
    location,
    salary,
    type,
    requirements,
    benefits,
    jobLevel,
    education,
    experience,
    createdBy: id,

});
return res.json({ message: "job posted successfully", success: true, job});

    } catch (error){
        return res.json({message: "Internal server error", success:false})
    }
};

export const getEmployerJobs = async(req,res)=> {
    try{
         const {id}=req.user;
         const jobs=await Job.find({createdBy:id}).populate("company").sort({createdAt:-1});
         return res.json({ success:true, jobs});
    } catch (error) {
        return res.json({message: "Internal server error", success:false})
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("company").sort({ createdAt: -1 });
        return res.json({ success: true, jobs });
    } catch (error) {
        return res.json({ message: "internal server error", success: false });
    }
};

export const deleteJob=async(req,res)=>{
    try{

        const {id}= req.user;
        const {jobId}=req.params;
        const job=await Job.findById(jobId);
        if(!job){
            return res.json({ message: "job not found", success: false});
        }

        if(job.createdBy !== id){
               return res.json({ message: "unauthorized", success: false});
        }
         await Job.findByIdAndDelete(jobId);
        
            return res.json({ success: "job deleted successfully", success: true});
    } catch (error) {
        return res.json({ message: "Internal server error", success: false});
    }
}