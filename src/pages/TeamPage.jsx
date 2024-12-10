import { teamMembers } from "../components/team/TeamMembers";
import TeamHeader from "../components/team/TeamHeader";
import TeamCard from "../components/team/TeamCard";
import TeamContent from "../components/team/TeamContent";

const TeamPage = () => {
    return (
        <>
            <TeamHeader />
            <TeamCard members={teamMembers} /> {/* Tüm üyeleri göster */}
            <TeamContent />
        </>
    )
}

export default TeamPage;