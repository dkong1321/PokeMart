import { NavLink } from "react-router-dom"
import "./splash__page.css"

const SplashPage = () => {
    return (
        <div className='splash__container'>
            <div className="splash__title__welcome">Welcome to Kanto-Prime!</div>
            {/* <NavLink className="splash__title__link" to='/products' exact={true}>Shop our Products Now</NavLink> */}
            <footer className="splash__footer">
            <a href="https://github.com/dkong1321/PokeMart">
                <div className="git__hub__pic"></div>
            </a>
            <a href="https://www.linkedin.com/in/darren-kong-06b47013b/">
                <div className="linked__hub__pic"></div>
            </a>
            </footer>
        </div>
    )

}

export default SplashPage
