import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export const Reports = () => {
 
  const handlePdf = (link) => {
    window.open(link)
  }
  return(
    <>
     <div className="reports-page page">
     <h1 className="ayuda-page__title">BARANGAY REPORTS</h1>
      <div className="reports">
        <div className='reports__segment'>
            <h2 className="title">Annual Investment Program</h2>
            <div className="item">
              <h4>Barangay Disaster Risk Reduction and Management Fund FY (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1JIZvO9YlrNyy4034bI7CCXGbq1lSlJ4d/view")
              }}>View</button>
            </div>
            <div className="item">
              <h4>Sangguniang Kabataan FY (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1RTkYfE6OpVHhk1YOvNhunADw_fOkrTq1/view")
              }}>View</button>
            </div>
            <div className="item">
              <h4>Senior Citizen and PWD FY (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1rm-AcjT8SGR8u6iq8Vtho5M3LQU1SIPS/view")
              }}>View</button>
            </div>
        </div>
        <div className='reports__segment'>
            <h2 className="title">Client Focused</h2>
            <div className="item">
              <h4>Provide Free Burial Assistance Program for the Indigent Families to Address the Burial Problem due to Poverty (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1Hw4CvXKqwCwxaaQt3GwkyoWip5W5YXpd/view")
              }}>View</button>
            </div>
        </div>
        <div className='reports__segment'>
            <h2 className="title">Gender Development Plan and Budget</h2>
            <div className="item">
              <h4>GAD Plan and Budget FY (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1vZ5L_xKO1t90Goij9yWGAqwtTGCrTQd1/view")
              }}>View</button>
            </div>
        </div>
        <div className='reports__segment'>
            <h2 className="title">Plantilla of Personnel</h2>
            <div className="item">
              <h4>Plantilla of Personnel FY (2021)</h4>
              <button className="item__btn item__btn--blue"
              onClick={() => {
                handlePdf("https://drive.google.com/file/d/1R-tMmBfK98XfQ5Y8XB9I6o1pTm-KhTnT/view")
              }}>View</button>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Reports