import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

// APPLY JOB
export const applyToJob = async (req, res) => {
  try {
    const { id } = req.user;
    const { jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: id,
      employer: job.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// USER APPLICATIONS
export const getStudentApplication = async (req, res) => {
  try {
    const { id } = req.user;

    const applications = await Application.find({ applicant: id })
      .populate({
        path: "job",
        populate: { path: "company" }
      })
      .populate("employer");

    return res.json({ success: true, applications });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// EMPLOYER APPLICANTS
export const getEmployerJobApplicants = async (req, res) => {
  try {
    const { id } = req.user;

    const applications = await Application.find({ employer: id })
      .populate({
        path: "job",
        populate: { path: "company" }
      })
      .populate("applicant");

    return res.json({ success: true, applications });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ⭐ ADMIN ALL APPLICATIONS FIXED
export const getAllApplications = async (req, res) => {
  try {
    let applications = await Application.find()
      .populate({
        path: "job",
        populate: { path: "company" }
      })
      .populate("applicant")
      .populate("employer");

    // REMOVE orphaned applications
    applications = applications.filter(a => a.job);

    return res.json({ success: true, applications });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// UPDATE STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    application.status = status;
    await application.save();

    return res.json({
      success: true,
      message: "Status updated",
      application,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};
