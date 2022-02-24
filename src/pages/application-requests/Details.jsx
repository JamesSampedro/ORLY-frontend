import {useState} from 'react'

const Details = ({details}) => {
  const [proofIsHidden, setProofIsHidden] = useState(true) 
  const [pictureIsHidden, setPictureIsHidden] = useState(true)
  const [signatureIsHidden, setSignatureIsHidden] = useState(true)
  return(
    <>
        <h5 className='text'>{details.gender !== undefined ? `Gender: ${details.gender}`  : ""}</h5>
        <h5 className='text'>{details.address !== undefined ? `Address: ${details.address}`  : ""}</h5>
        <h5 className='text'>{details.birthday !== undefined ? `Birthday: ${details.birthday}`  : ""}</h5>
        <h5 className='text'>{details.birthplace !== undefined ? `Birthplace: ${details.birthplace}`  : ""}</h5>
        <h5 className='text'>{details.issuedFor !== undefined ? `Issued For: ${details.issuedFor}`  : ""}</h5>
        <h5 className='text'>{details.livingSince !== undefined ? `Living Here Since: ${details.livingSince}`  : ""}</h5>
        <h5 className='text'>{details.designation !== undefined ? `Designation: ${details.designation}`  : ""}</h5>
        <h5 className='text'>{details.maritalStatus !== undefined ? `Marital Status: ${details.maritalStatus}`  : ""}</h5>
        <h5 className='text'>{details.occupation !== undefined ? `Occupation: ${details.occupation}`  : ""}</h5>
        <h5 className='text'>{details.citizenship !== undefined ? `Citizenship: ${details.citizenship}`  : ""}</h5>
        <h5 className='text'>{details.businessType !== undefined ? `Gender: ${details.businessType}`  : ""}</h5>
        <h5 className='text'>{details.tin !== undefined ? `TIN Number: ${details.tin}`  : ""}</h5>
        <h5 className='text'>{details.sss !== undefined ? `SSS/GSIS Number: ${details.sss}`  : ""}</h5>
        <h5 className='text'>{details.height !== undefined ? `Height: ${details.height}`  : ""}</h5>
        <h5 className='text'>{details.weight !== undefined ? `Weight: ${details.weight}`  : ""}</h5>
        <h5 className='text'>{details.contactNumber !== undefined ? `Contact Number: ${details.contactNumber}`  : ""}</h5>
        <h5 className='text'>{details.emergencyContact !== undefined ? `Emergency Contact: ${details.emergencyContact}`  : ""}</h5>

        {details.proofOfPayment !== undefined ? <p onClick={() =>{setProofIsHidden(!proofIsHidden)}}
        className='btn btn--standard'>{proofIsHidden ? "Show" : "Hide"} Proof of Payment</p> : ""}
        <img src={details.proofOfPayment} alt="Proof Of Payment" className={proofIsHidden ? "hidden" : "proof"} />
        {details.picture !== undefined ? <p onClick={() =>{setPictureIsHidden(!pictureIsHidden)}}
        className='btn btn--standard'>{pictureIsHidden ? "Show" : "Hide"} 2x2 Picture</p> : ""}
        <img src={details.picture} alt="2x2 Id" className={pictureIsHidden ? "hidden" : "picture"} />
        {details.signature !== undefined ? <p onClick={() =>{setSignatureIsHidden(!signatureIsHidden)}}
        className='btn btn--standard'>{signatureIsHidden ? "Show" : "Hide"} Signature</p> : ""}
        <img src={details.signature} alt="signature" className={signatureIsHidden ? "hidden" : "picture"} />
    </>
  )
};

export default Details;
