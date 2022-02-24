import ayudaPic from './../../img/ayuda-pic.png'
const Title = () => {
    return (
        <div className="ayuda-program-page-title">
            <div className="ayuda-program-page-title--name">
                <h1>AYUDA</h1>
                <h1>PROGRAM</h1>
            </div>
            <img src={ayudaPic} alt="ayuda-pic" className="ayuda-program-page-title--img"/>    
        </div>      
    )
}

export default Title
