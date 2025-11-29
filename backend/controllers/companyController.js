import Company from "../models/companyModel.js";

// ADD COMPANY
export const addCompany = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, about } = req.body;
    const logo = req.file?.filename;

    if (!name || !about || !logo) {
      return res.json({ success: false, message: "All fields required" });
    }

    const company = await Company.create({
      name,
      about,
      logo,
      createdBy: id,
    });

    return res.json({ success: true, company });

  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// EMPLOYER COMPANIES
export const getEmployerCompanies = async (req, res) => {
  try {
    const { id } = req.user;
    const companies = await Company.find({ createdBy: id });

    return res.json({ success: true, companies });

  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

//  ADMIN GET ALL COMPANIES FIXED
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.json({ success: true, companies });

  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// DELETE COMPANY
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    await Company.findByIdAndDelete(id);

    return res.json({ success: true, message: "Company deleted" });

  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
