import Categories from "../components/Categories";
import Hero from "../components/Hero";
import HowWorks from "../components/HowWorks";
import PopularVacancies from "../components/PopularVacancies";
import Jobs from "../components/Jobs";   
import Testimonial from "../components/Testimonial";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
    const {setQuery}=useContext(AppContext);
    useEffect(()=> {
     setQuery("");
    }, [])
    return (
        <div>
            <Hero />
            <PopularVacancies />
            <HowWorks />
            <Categories />
            <Jobs />
            <Testimonial />
        </div>
    );
};

export default Home;
