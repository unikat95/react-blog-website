import React, { useContext } from "react";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import BlogContext from "../../context/BlogContext";

export default function Home() {
  const { userDetails } = useContext(BlogContext);
  return (
    <>
      <DashboardContainer>
        <div>
          <p>
            Welcome, {userDetails.firstName} {userDetails.lastName}
          </p>
        </div>
      </DashboardContainer>
    </>
  );
}
