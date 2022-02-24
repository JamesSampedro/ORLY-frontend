import heroVideo from './../../img/hero.mp4'
const Hero = () => {
    return (
        <div className="hero">
            <video id="videoIntro" type="video/mp4" muted playsInline autoPlay loop>
                <source src={heroVideo} type="video/mp4"/>

            </video>
            <div className="content">
                <p className="heading">A Community that Cares<span className="dot">.</span></p>
                <p className="subheading">Teniente Tiago, GMA Cavite</p>
            </div>
        </div>
    )
}

export default Hero
