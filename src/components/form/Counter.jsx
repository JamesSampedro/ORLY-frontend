import { InputHandler } from "../../helpers/HandlerHelper";

const Counter = (props) => {

    const handleDecrement = (e,state,setter,key) =>{
        e.preventDefault();
        if(state[key] > 0){
            setter({...state,[key]:(state[key] - 1)})
        }
    }

    const handleIncrement = (e,state,setter,key,max) =>{
        e.preventDefault();
        if(state[key] < max){
            setter({...state,[key]:(state[key] + 1)})
        }
    }

    return (
        <div className="form__number-counter">
            <label htmlFor={props.name} className="form__label form__number-counter--label">{`${props.name}`}</label>
            <div className="form__number-counter--input--wrapper">
                <button className="form__number-counter--button form__number-counter--blue"
                onClick={(e) => {
                    handleDecrement(e,props.state,props.setter,props.name)
                }}>-</button>
                <input type="number" name={props.name} className="form__input form__number-counter--number" value={props.state[props.name]}
                onChange={(e) => {
                    InputHandler(props.state, props.setter, props.name, e.target.value)
                }}
                min="0" max={`${props.max}`}/>
                <button className="form__number-counter--button form__number-counter--blue"
                onClick={(e) => {
                    handleIncrement(e,props.state,props.setter, props.name,props.max)
                }}>+</button>
            </div>
        </div>
    )
}

export default Counter
