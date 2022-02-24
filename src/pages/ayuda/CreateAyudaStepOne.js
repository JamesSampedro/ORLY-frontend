import LabeledField from '../../components/form/LabeledField'
const CreateAyudaStepOne = () => {
    return (
        <form className="registration__form registration__step-one">
            <p className="registration__form--title">Sponsor Information</p>
            <LabeledField 
                label ='First Name'
                name='registration__form--first-name'
                type='text'
                formName='registration__form--input'
                placeholder='ex. Juan'
            />
            <LabeledField 
                label ='Middle Name'
                name='registration__form--middle-name'
                type='text'
                formName='registration__form--input'
                placeholder='ex. Santos'
            />
            <LabeledField 
                label ='Last Name'
                name='registration__form--last-name'
                type='text'
                formName='registration__form--input'
                placeholder='ex. Dela Cruz'
            />
            <LabeledField 
                label ='Address'
                name='registration__form--address'
                type='text'
                formName='registration__form--input'
                placeholder='ex. B14 L8 White Street'
            />
            <LabeledField 
                label ='Occupation'
                name='registration__form--occupation'
                type='text'
                formName='registration__form--input'
            />
            <div className='labeled-field' id='registration__form--age'>
                <label htmlFor="registration__form--age--id">Age</label>
                <input type="number" id="registration__form--age--id" className="registration__form--input" 
                name="registration__form--age" min="1" max="199" placeholder="ex. 24"/>
            </div>
            <LabeledField 
                label ='Phone Number'
                name='registration__form--contact-number'
                type='text'
                formName='registration__form--input'
                placeholder='ex. 09*********'
            />
            <div className="registration__form--gender">
                <span>Gender</span>
                <select name="" id="" className="select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <LabeledField 
                label ='Email Address'
                name='registration__form--email'
                type='text'
                formName='registration__form--input'
                placeholder='ex. example@gmail.com'
            />
                <button className="btn--next">
                    Next <span>{'>'}</span>
                </button>
        </form>
    )
}

export default CreateAyudaStepOne
