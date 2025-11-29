
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
import About from "./pages/About";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import MyApplications from "./pages/user/MyApplications";
import Profile from "./pages/user/Profile";
import EmployerLayout from "./pages/employer/EmployerLayout";
import CompaniesList from "./pages/employer/CompaniesList";
import AddCompany from "./pages/employer/AddCompany";
import PostJob from "./pages/employer/PostJob";
import JobsList from "./pages/employer/JobsList";
import Applicants from "./pages/employer/Applicants";
import AdminLayout from "./pages/admin/AdminLayout";
import CategoryList from "./pages/admin/CategoryList";
import AddCategory from "./pages/admin/AddCategory";
import AllCompanies from "./pages/admin/AllCompanies";
import AllApplications from "./pages/admin/AllApplications";
import AllUsers from "./pages/admin/AllUsers";
import Jobs from "./pages/admin/Jobs";

const App = () => {
  const adminPath=useLocation().pathname.includes("admin");
    const employerPath=useLocation().pathname.includes("employer");
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl 2xl:max-w-7xl mx-auto px-4">
      {adminPath || employerPath ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

                       {/* user routes */}
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/profile" element={<Profile />} />

                {/* employer routes */}
                <Route path="/employer" element={<EmployerLayout/>} >
                <Route index element={<CompaniesList />} />
                   <Route path="add-company" element={<AddCompany />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="jobs-list" element={<JobsList />} />
                     <Route path="applicants" element={<Applicants />} />
                
                </Route>

                 {/* admin routes */}
                  <Route path="/admin" element={<AdminLayout/>} >
                <Route index element={<CategoryList />} />
                   <Route path="add-category" element={<AddCategory />} />
                    <Route path="all-companies" element={<AllCompanies />} />
                    <Route path="all-applications" element={<AllApplications />} />
                     <Route path="all-users" element={<AllUsers />} />
                      <Route path="jobs" element={<Jobs />} />
                      
                
                </Route>

      </Routes>
       {adminPath || employerPath ? null : <Footer />}
       <Toaster />
    </div>
  );
};

export default App;
