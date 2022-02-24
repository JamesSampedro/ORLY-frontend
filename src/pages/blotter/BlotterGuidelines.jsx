import React from "react";
import Infographics from '../../img/blotter-infographics.png';
import BlotterInfographics from '../../img/subject-person-infographics.png';

const BlotterGuidelines = () => {
  return (
      <>
        <h1 className="page-header">Blotter Guidelines</h1>
        <div className="blotter-page page">
        <img src={Infographics} alt="" className="vaccine-infographics"/>
        <img src={BlotterInfographics} alt="" className="vaccine-infographics"/>
        </div>
      </>
  );
};

export default BlotterGuidelines;