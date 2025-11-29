import { assets } from "../assets/assets";

const About = () => {
    return <div className="py-16 px-4 max-w-7xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* left section  */}
        <div>
            <img src={assets.hero_img} alt="" />
        </div>

        {/* right  section  */}
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 ">About Our Job Portal</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
  We connect talented job seekers with top employers to create opportunities that drive growth and success.  
  Our platform is designed to make the hiring process faster, smarter, and more efficient for both candidates and companies.  
  Whether you are looking for your dream job or the perfect candidate, we bridge the gap between ambition and opportunity.  
  Together, we help build a stronger workforce for the future.  
</p>

          <p className="text-gray-600 leading-relaxed">Explore thousands of job listings across industries and apply seamlessly in just a few clicks.  
  Find the right opportunity that matches your skills and career goals.</p>

        </div>
      </div>

       <div className="mt-12 bg-gray-100 rounded-xl p-6 shadow-inner">
        <h3 className="text-2xl text-gray-700 mb-3 font-semibold">Why Choose Us?</h3>
        <p className="text-gray-600 leading-relaxed"> Thousands of verified job listings
            <br />
            Easy application process <br /> Personalized job recommendations
            <br /> Secure and trustworthy platform
        </p>
       </div>
    </div>;

};
export default About;