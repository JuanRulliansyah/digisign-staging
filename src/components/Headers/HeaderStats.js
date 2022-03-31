import React, { useEffect, useState } from "react";

// Components
import CardVerification from "components/Cards/CardVerification";
import { getProfileRequirement } from "services/profile/userModule";

export default function HeaderStats() {


  const [profileData, setProfileData] = useState({});
  const [positionLetterData, setPositionLetterData] = useState({});
  const [certificateData, setCertificateData] = useState({});


  useEffect(() => {
      async function fetchProfileRequirement() {
          await getProfileRequirement().then(response => {
              if(response.status !== 200) {
              } else {
                  const profileRequirement = response.data.data;
                  setProfileData(profileRequirement['profile']['stats']);
                  setPositionLetterData(profileRequirement['position_letter']['stats']);
                  setCertificateData(profileRequirement['certificate']['stats']);
              }
          });
      }
      fetchProfileRequirement();
  }, []);

  // useEffect(() => {
  //   console.log(profileData);
  // }, [profileData]);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardVerification
                  statSubtitle={profileData.statSubtitle}
                  statTitle={profileData.statTitle}
                  statLink={profileData.statLink}
                  statStatus={profileData.statStatus}
                  statStatusColor={profileData.statStatusColor}
                  statPercentColor={profileData.statPercentColor}
                  statDescripiron={profileData.statDescription}
                  statIconName={profileData.statIconName}
                  statIconColor={profileData.statIconColor}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardVerification
                  statSubtitle={positionLetterData.statSubtitle}
                  statTitle={positionLetterData.statTitle}
                  statLink={positionLetterData.statLink}
                  statStatus={positionLetterData.statStatus}
                  statStatusColor={positionLetterData.statStatusColor}
                  statDescripiron={positionLetterData.statDescription}
                  statIconName={positionLetterData.statIconName}
                  statIconColor={positionLetterData.statIconColor}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardVerification
                  statSubtitle={certificateData.statSubtitle}
                  statTitle={certificateData.statTitle}
                  statLink={certificateData.statLink}
                  statStatus={certificateData.statStatus}
                  statStatusColor={certificateData.statStatusColor}
                  statDescripiron={certificateData.statDescription}
                  statIconName={certificateData.statIconName}
                  statIconColor={certificateData.statIconColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
