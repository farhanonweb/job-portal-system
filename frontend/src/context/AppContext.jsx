import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [query, setQuery] = useState("");

  const [isJobApplied, setIsJobApplied] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]);

  // Fetch logged user
  const fetchLoggedInUser = async () => {
    try {
      const { data } = await axios.get("/user/me");

      if (data.success) {
        setUser(data.user);

        if (data.user.role === "admin") {
          setAdmin(true);
        }
      }
    } catch (error) {
      console.log("User not logged in");
    }
  };

  // Fetch all applicants
  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get("/application/all-applications");
      if (data.success) {
        setApplicantsData(data.applications);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applicants"
      );
    }
  };

  // Fetch all companies
  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get("/company/all");
      if (data.success) {
        setCompanyData(data.companies);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch companies"
      );
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/category/all");
      if (data.success) setCategoriesData(data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get("/job/all");
      if (data.success) setJobsData(data.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  //  Save job locally
  const saveJob = (job) => {
    setSavedJobs((prev) => {
      if (prev.find((i) => i._id === job._id)) return prev;
      return [...prev, job];
    });
    toast.success("Job saved");
  };

  // Load public data on mount
  useEffect(() => {
    fetchLoggedInUser();
    fetchCategories();
    fetchJobs();
  }, []);

  // FIXED ROLE LOGIC
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      fetchApplicants();
      fetchCompanies();
    }

    if (user.role === "employer") {
      fetchApplicants();
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    admin,
    setAdmin,
    categoriesData,
    jobsData,
    query,
    setQuery,
    isJobApplied,
    setIsJobApplied,
    savedJobs,
    saveJob,
    companyData,
    applicantsData,
    axios,
    fetchApplicants,
    fetchCompanies,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
