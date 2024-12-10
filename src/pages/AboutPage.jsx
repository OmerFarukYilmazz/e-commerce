import AboutHeader from "../components/about/AboutHeader";
import AboutContent from "../components/about/AboutContent";
import AboutVideo from "../components/about/AboutVideo";
import TeamCard from "../components/team/TeamCard";
import { teamMembers } from "../components/team/TeamMembers";
import AboutClients from "../components/about/AboutClients";
import AboutTestimonials from "../components/about/AboutTestimonials";

const AboutPage = () => {
    return (
        <div>
            <AboutHeader />
            <AboutContent />
            <AboutVideo />
            <TeamCard members={teamMembers} count= {3}/>
            <AboutClients />
            <AboutTestimonials />
        </div>
    )
}

export default AboutPage;
