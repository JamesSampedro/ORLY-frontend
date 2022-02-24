import {Link} from 'react-router-dom'
import {useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteAyudaProgram, removeAdminResponse } from "../../actions/admin";
import { showToastNotification } from './../../functions/showToastNotification';

const ProgramCards = (props) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        const token = localStorage.getItem("authToken")
        dispatch(deleteAyudaProgram(props.id,token))
        dispatch(removeAdminResponse())
    }

  return(
        <div className="program-details-card" key={props.iKey}>
            <h1 className="program-details-card__title">{props.programName}</h1>
            <div className="program-details-card__content">
                <div className="column">
                    <h3>Supplies</h3>
                    {props.supplies.map((e,i) => {
                        return <p key={i}>{`${e.amount} ${e.unit}s of ${e.name}`}</p>
                    })}
                </div>
                <div className="column">
                    <h3>Sponsor</h3>
                    <p>{props.sponsor}</p>
                    <h3>Facilitator</h3>
                    <p>{props.facilitator}</p>
                </div>
            </div>
            <div className="button-wrapper">
                <Link to={`/ayuda-recipient`}>
                    <button className="btn--prev"
                    onClick={(e) => {
                        localStorage.setItem('ayudaId', props.id)
                    }}>Recipients</button>
                </Link>
                <button className="btn--delete"
                onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                }}>Delete Program</button>
            </div>
        </div>
  ) 
};

export default ProgramCards;
