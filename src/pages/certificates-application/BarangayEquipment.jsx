import { useState, useEffect } from "react"
import { InputHandler } from "../../helpers/HandlerHelper";
import Counter from '../../components/form/Counter'

const BarangayEquipment = () => {
    
    const userData = {firstName:'Raquel', lastName: 'Sorila', middleInitial:'A.', address: '', number: ''}
    
    const [availableEquipments, setAvailableEquipments] = useState({chair: 34, tent: 5})
    const [equipmentList, setEquipmentList] = useState(["chair", "tent"])
    const initialEquipment = {}

    equipmentList.map((i) => {
        return initialEquipment[i] = 0;
    })

    const [equipment, setEquipment] = useState ({name:`${userData.firstName} ${userData.middleInitial} ${userData.lastName}`, 
    address:'', number:'', ...initialEquipment})
    

    useEffect(() => {

        equipmentList.map((i) => {
            if(equipment[i] > availableEquipments[i]){
                setEquipment({...equipment, [i]:availableEquipments[i]})
            }else if (equipment[i] < 0){
                setEquipment({...equipment, [i]: 0})
            }
        })

    },[equipment,availableEquipments,equipmentList])


    return (
        <div className="equipment-page page">
        <div className="form__wrapper form__wrapper--blue">
            <h1 className="form__title form__title--blue">BARANGAY EQUIPMENT</h1>
            <div className="form__container">
                <form className="form__control">
                <h3 className="form__name">Borrowing Equipment Form</h3>
                <p className="form__instruction">Please provide all information for the borrowing equipment requested below.</p>
                    <label htmlFor="name" className="form__label">Fullname</label>
                    <input className="form__input" type="text" name="name" value={equipment.name} onChange={(e) => {
                        InputHandler(equipment, setEquipment, "name", e.target.value)
                    }}/>
                    <label htmlFor="address" className="form__label" >House Number and Street/Village</label>
                    <input className="form__input" type="text" name="address" placeholder="Blk6 Lot34 White Street, Teniente Tiago, GMA Cavite"
                    value={equipment.address} onChange={(e) => {
                        InputHandler(equipment, setEquipment, "address", e.target.value)
                    }}/>
                    <label htmlFor="number" className="form__label">Phone Number/Telephone Number</label>
                    <input className="form__input" type="text" name="number" placeholder="09062442845"
                    value={equipment.type} onChange={(e) => {
                        InputHandler(equipment, setEquipment, "number", e.target.value)
                    }}/>

                    <div className="form__number-counter--wrapper">
                        {equipmentList.map((i) => {
                            return <Counter key={i} name={i} state={equipment} setter={setEquipment} max={availableEquipments[i]}/>
                        })}
                    </div>
                    
                                                    
                    <p className="form__disclaimer">
                    Note: By agreeing with this application, I understand that all the information that I've entered will be used ONLY for barangay purposes. My consent effectively constitutes a waiver of any and all privacy rights pertaining to the disclosure, collection, and use of my personal information</p>
                    <button className="btn btn--standard btn--y-1 form__btn">Submit</button>
                </form>
            </div>
            
         
        </div>
    </div>
    )
}

export default BarangayEquipment
