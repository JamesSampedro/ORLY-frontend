import Map from '../../img/map.png'
import Orly from '../../img/orly-logo.png'
import Item from './Item'
import QandA from './QandA'
const About = () => {
    const barangayOfficials = [
        {name: "Hon. Victor L. Tuatis", position: "Barangay Chairman"},
        {name: "Hon. Luningning F. Corneja", position: "Barnagay Kagawad"},
        {name: "Hon. Alberto M. Alano", position: "Barangay Kagawad"},
        {name: "Hon. Claire Jane M. Tuatis", position: "Barangay Kagawad"},
        {name: "Hon. Ricardo R. Laron", position: "Barangay Kagawad"},
        {name: "Hon. Sheila Rhea C. Abuyen", position: "Barangay Kagawad"},
        {name: "Hon. Estrelita T. Bombita", position: "Barangay Kagawad"},
        {name: "Hon. Marites M. Villanueva", position: "Barangay Kagawad"},
        {name: "Hon. Mari Nela A. Saladino", position: "Barangay Kagawad"},
    ] 
    const skOfficials = [
        {name: "Hon. Mari Nela A. Saladino", position: "SK Chairperson"},
        {name: "Hon. Ronn D. Ignacio", position: "SK Councilor"},
        {name: "Hon. Mellesence M. Licuanan", position: "SK Councilor"},
        {name: "Hon. Raquel A. Sorila", position: "SK Councilor"},
        {name: "Hon. Dan Ira King M. Tuatis", position: "SK Councilor"},
        {name: "Hon. Cyril Duane O. Montano", position: "SK Councilor"},
        {name: "Hon. Rose Ann F. Duran", position: "SK Councilor"},
        {name: "Hon. Ma. Patricia A. Paculan", position: "SK Councilor"},
    ] 

    const faq = [
        {question: "What is a Barangay Certificate of Residency?",
         answer: "This document proves that you are a resident of Barangay Teniente Tiago." },
        {question: "Where to see the reference number for Ayuda?",
         answer: "Go to the ASSISTANCE page then, click Ayuda and you will see the user details on top." },
        {question: "Some pages are not displayed correctly.",
         answer: "Please be sure to clear your browser cache to see the latest version." },
        {question: "I have other questions or want to provide feedback. How may i contact you?",
         answer: "Please send suggestions or questions using the CONTACT US page." },
    ]
    return (
        <>
        <div className="page-header">ABOUT</div>
        <div className="about-page">
            <div className="about-page__intro">
                <img src={Map} alt="" className="about-page__intro--map"/>
                <div className="about-page__intro--description">
                    <h4 className="title">Barangay Teniente Tiago</h4>
                    <p className="content">Teniente Tiago is a (Formerly Area A)(Metro San Jose) that is a barangay in the municipality of General Mariano Alvarez, in the province of Cavite. Its population as determined by the 2015 Census was 3,257. This represented 2.10% of the total population of General Mariano Alvarez. Teniente Tiago is situated at approximately 14.3225, 121.0379, in the island of Luzon.</p>
                </div>
            </div>
            <div className="about-page__orly">
                <div className="heading">
                    <img src={Orly} alt=""  className="logo"/>
                    <h1 className="title">ORLY</h1>
                </div>
                <div className="content">
                    <p>Orly is a web-based system that provides convenience, efficiency, and transparency to the citizens of barangay Teniente Tiago. It caters to different transactions available inside the barangay such as registration of new residents, online application of identification card, reservation for borrowing of equipment, viewing of available schedule in getting a certificate of indigency, cedula, barangay clearance, and barangay permit, a page for blotter reports, and application of sponsorship. It also provides basic information, programs, projects, and statistical reports of the barangay.  </p>
                    <br/>
                    <p>Orly has an automated selection and prioritization of beneficiaries of the relief supplies and has the necessary information of people residing in barangay Teniente Tiago. Through the qualifications set for the selection, the system will filter the citizens and release a list of qualified beneficiaries.</p>
                </div>
            </div>
            <div className="about-page__officials">
                <h2 className="title">Barangay Officials (2019-2022)</h2>
                {barangayOfficials.map(item => {
                    return <Item name={item.name} position={item.position}/>
                })}
            </div>
            <div className="about-page__officials">
                <h2 className="title"> Sangguniang Kabataan Officials (2019-2022)</h2>
                {skOfficials.map(item => {
                    return <Item name={item.name} position={item.position}/>
                })}
            </div>
            <div className="about-page__faq">
                <h2 className="title">FREQUENTLY ASKED QUESTIONS</h2>
                {faq.map(item => {
                    return <QandA question={item.question}
                    answer={item.answer}/>
                })}
            </div>
        </div>
        </>
    )
}

export default About
