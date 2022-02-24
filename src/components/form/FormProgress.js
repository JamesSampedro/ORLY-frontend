const FormProgress = (props) => {
    return (
        <div className="registration__progress">
             <h1 className="registration__progress--title">{props.title}</h1>
             <h4 className="registration__progress--sub-title">Please provide all information requested below</h4>
             <div className="registration__progress--visualization">
                 <div className={`registration__progress--visualization--step step-1 ${props.steps[0]}`}>
                     <h3 className="step-number">1</h3>
                     <h4 className="step-name">{props.step1Name}</h4>
                 </div>
                 <div className="registration__progress--visualization--seperator"></div>  
                 <div className={`registration__progress--visualization--step step-2 ${props.steps[1]}`}>
                     <h3 className="step-number">2</h3>
                     <h4 className="step-name">{props.step2Name}</h4>
                 </div>
                 <div className="registration__progress--visualization--seperator"></div>
                 <div className={`registration__progress--visualization--step step-3 ${props.steps[2]}`}>
                     <h3 className="step-number">3</h3>
                     <h4 className="step-name">{props.step3Name}</h4>
                 </div>
             </div>
        </div>
    )
}

export default FormProgress
