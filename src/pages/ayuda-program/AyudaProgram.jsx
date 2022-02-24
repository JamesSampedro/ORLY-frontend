import Title from './Title';
import Cash from './../../img/cash.png';
import Food from './../../img/foods.png';
import Water from './../../img/water.png';
import Medical from './../../img/medical.png';

const AyudaProgram = () => {
    const essentials = [{title : "Cash", img: Cash},{title : "Food", img: Food},{title : "Water", img: Water},{title : "Medical Supplies", img: Medical}];
    return (
        <div className="ayuda-program-page">
            <Title />
            <div className="ayuda-program-page--content">
                <p>Life necessities such as cash, food, water, and medical supplies play a critical roles in reconstructing communities in all recovering stages. With that, barangay Teniente Tiago created a program named Ayuda Management Program for fair and automated selection of relief supplies beneficiaries. Given that there will be a qualifications to the selected receivers, the barangay targets to accommodate all of its constituents.</p>
                <br/>
                <p>Ayuda management program provides equal assistance and distribution of relief supplies to the prioritized citizen based on the qualifications. The status of every citizen as beneficiary or not, can be seen in the Ayuda profile. Selected beneficiaries can claim their supplies in barangay Teniente Tiago.</p>


                <div className="essentials">
                <h3>TOGETHER WE'RE PROVIDING THE ESSENTIALS TO  SURVIVE TODAY</h3>
                <div className="essentials-items">
                    {essentials.map((e, i) => {
                        return(<div className="essentials-items--card"
                        id={`${e.title.toLowerCase().replace(/\s/g, '')}`}>
                            <img src={e.img} alt={e.title} />
                            <h2>{e.title}</h2>
                        </div>)
                    })}
                </div>
                <h3>FOR A BETTER TOMORROW</h3>
                </div>
                <div className="priorities">
                <p className="priorities--title">The priorities to be given assistance by Barangay Teniente Tiago are as follows:</p>
                <div className="priorities--content">
                    <p>a. Resident must be residing in Teniente Tiago for 4 months to be qualified in Ayuda Program. </p>
                    <p>b. Criteria for prioritizing residents include number of households, resident category, and income range. </p>
                    <p>c. A family should contain more than 3 members to be included in the prioritization. </p>
                    <p>d. Infant, Pregnant, Senior Citizen, Unemployed, PWD are Teniente Tiago's priority recipients.</p>
                    <p>e. Monthly income should range from Php 8,000.00 to Php 10,000.00 to become a priority benefiaciary.</p>
                </div>
                <p className="note">Note : The criteria will only be used if supplies are insufficient, or only intended for a specific category of residents.</p>
            </div>
            </div>
        </div>
    )
}

export default AyudaProgram
