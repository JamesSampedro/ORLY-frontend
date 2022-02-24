import CaviteSeal from '../../img/cavite-seal.png'
import GmaSeal from '../../img/gma-seal.png'
import LabeledField from '../../components/form/LabeledField'
const IdForm = () => {
    return (
        <form action="post" className="id-page__form" autoComplete='off'>
            <div className="id-page__form--card">
                <div className="id-page__form--card--title">
                    <img className='seal' src={CaviteSeal} alt="Seal of the Province of Cavite" />
                    <h1>Barangay Teniente Tiago</h1>
                    <img className='seal' src={GmaSeal} alt="Seal of the Municipality of GMA" />
                </div>
                <div className="id-page__form--card--name input__horizontal">
                    <LabeledField 
                        label ='Last Name'
                        name='id-page__last-name'
                        type='text'
                        formName='id-page__form--input'
                        placeholder='ex. Dela Cruz'
                    />
                    <LabeledField 
                        label ='First Name'
                        name='first-name'
                        type='text'
                        formName='id-input'
                        placeholder='ex. Juan'
                    />
                    <LabeledField 
                        label ='Middle Name'
                        name='middle-name'
                        type='text'
                        formName='id-input'
                        placeholder='ex. Santos'
                    />
                </div>
                <div className="id-form--card--info">
                    <LabeledField 
                        label ='Gender'
                        name='gender'
                        type='text'
                        formName='id-input'
                        placeholder='ex. Male'
                    />
                    <LabeledField 
                        label ='Date of Birth'
                        name='birthday'
                        type='Date'
                        formName='id-input'
                    />
                    <LabeledField 
                        label ='Address'
                        name='address'
                        type='text'
                        formName='id-input'
                        placeholder='ex. Blk 14 Lt 4 Mahogany Street'
                    />
                </div>
                <div className="id-form--card--upload">
                    <div className="id-form--submit">
                        <label htmlFor="profile-picture">Upload 2x2 Picture</label>
                        <input type="file" id="profile-picture" name='picturename' accept="image/*"/>
                    </div>
                </div>
                
            </div>
        </form>
    )
}

export default IdForm
