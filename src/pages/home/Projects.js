import socialIcon from '../../img/social.png'
import wasteIcon from '../../img/waste.png'
import healthIcon from '../../img/health.png'
import educationIcon from '../../img/gradcap.png'
import disasterIcon from '../../img/disaster.png'
import economyIcon from '../../img/economy.png'
import infrastructureIcon from '../../img/infrastructure.png'
import peaceIcon from '../../img/peace.png'
const Projects = () => {
    
    // const containerRef = useRef(null)
    // const [isVisible , setIsVisible] = useState(false)

    // callbackFunction = (entries) => {
    //     const [ entry ] = entries
    //     setIsVisible(entry.isIntersecting)
    // }

    

    // const observer = new IntersectionObserver(callbackFunction, options)
    // observer.observe("section-one")

    // const options = {
    //     root: null,
    //     rootMargin: "-220px 0px 0px 0px",
    //     threshold: 1.0
    // }

   

    return (
        <div className="projects section-one">
            <h1 className="title">Projects and Programs</h1>
            <div className="card-container">
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-blue">
                            <img src={socialIcon} alt="social" />
                            <h2>Social Development</h2>
                        </div>
                        <div className="card-inner--back gradient-blue">
                            <p>Barangay Teniente Tiago expands the diameter of the barangay hall, installs
                                streetlights, and purchases equipment for the citizens' convenience.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-green">
                            <img src={wasteIcon} alt="waste" />
                            <h2>Waste Management</h2>
                        </div>
                        <div className="card-inner--back gradient-green">
                            <p>Teniente Tiago implements programs that preserve and protect that natural resources and 
                                imposes rules in waste segregation to maintain cleanliness.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-violet">
                            <img src={educationIcon} alt="education" />
                            <h2>Education</h2>
                        </div>
                        <div className="card-inner--back gradient-violet">
                            <p>Barangay Teniente Tiago ensues to give financial assistance and educationaal programs for the
                                hardworking students.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-dark-green">
                            <img src={healthIcon} alt="health" />
                            <h2>Health</h2>
                        </div>
                        <div className="card-inner--back gradient-dark-green">
                            <p>Teniente Tiago offers an intensive range of medicines and health services to the citizens.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-red">
                            <img src={disasterIcon} alt="disaster" />
                            <h2>Disaster Risk Reduction</h2>
                        </div>
                        <div className="card-inner--back gradient-red">
                            <p>Barangay Teniente Tiago provides programs that focuses on educating when it comes
                                to disaster and risk preparedness to reduce casualties.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-dark-blue">
                            <img src={economyIcon} alt="economy" />
                            <h2>Economic Development</h2>
                        </div>
                        <div className="card-inner--back gradient-dark-blue">
                            <p>Teniente Tiago arranges seminars for livelihood or enterpreneurship programs intended for the
                                people.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-yellow">
                            <img src={peaceIcon} alt="peace" />
                            <h2>Peace and Order</h2>
                        </div>
                        <div className="card-inner--back gradient-yellow">
                            <p>Barangay Teniente Tiago's peacekeeping and security officers are always rounding to ensure 
                                the citizens' peace and safety.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-inner--front gradient-turquoise">
                            <img src={infrastructureIcon} alt="infrastucture" />
                            <h2>Infrastructure Development</h2>
                        </div>
                        <div className="card-inner--back gradient-turquoise">
                            <p>Teniente Tiago is working on introducing new planning methodologies when it comes to
                                infrastructure to fit in modernization and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
