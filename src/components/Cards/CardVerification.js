import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardVerification({
  statSubtitle,
  statTitle,
  statStatus,
  statLink,
  statStatusColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
    <Link to={statLink}>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={statStatusColor + " mr-1"}>
              <b>{statStatus}</b>
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
      </Link>
    </>
  );
}

CardVerification.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
  statStatus: "3.48",
  statStatusColor: "text-emerald-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardVerification.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statStatus: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statStatusColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
