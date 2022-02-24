import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from  'react-loader-spinner'

const Loading = () => {
    return (
        <div className="application-status-page" style={{marginTop: "100px"}}>
            <BallTriangle color="#583E7A" height={80} width={80} />
        </div>
    )
}

export default Loading

