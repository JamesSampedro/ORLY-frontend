import FormProgress from '../../components/form/FormProgress'
import {useState} from 'react'
import CreateAyudaStepOne from './CreateAyudaStepOne'
const Ayuda = () => {
    const [steps, setSteps] = useState(['active',''])
    return (
        <div className="ayuda-page">
            <h1 className="ayuda-page__title">AYUDA PROGRAM</h1>
            <FormProgress
            steps={steps}
            title={'Start Ayuda Program'}
            step1Name={'Sponsor'}
            step2Name={'Program'}/>
            <CreateAyudaStepOne/>
        </div>
    )
}

export default Ayuda
