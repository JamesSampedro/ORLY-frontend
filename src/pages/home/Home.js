import Projects from './Projects'
import Services from './Services'
import Hero from './Hero'
import Ayuda from './Ayuda'
const Home = () => {
    return (
        <div className="home-page">
            <Hero/>
            <Projects/>
            <Services/>
            <Ayuda/>
        </div>
    )
}

export default Home
