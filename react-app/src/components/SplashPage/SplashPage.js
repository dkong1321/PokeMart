import { NavLink } from "react-router-dom"
import "./splash__page.css"

const SplashPage = () => {
    return (
        <div className='splash__container'>
            <div className="splash__title__welcome">Welcome to Kanto-Prime!</div>
            <div className="splash__link__image__container">
                <img className="test__image" src="http://kanto-prime.s3.amazonaws.com/2b83627ece0049e693a163e04f2dedf1.png"></img>
                <div>
                    <div className="splash__link__container">
                        <NavLink className="splash__link" to="/category/plush"><img className="splash__img" src="http://kanto-prime.s3.amazonaws.com/41f79464837940bf8f5c04c9f5f23a22.jpg"></img></NavLink>
                    </div>
                    <div className="splash__link__container">
                        <NavLink className="splash__link" to="/category/tradingcards"><img className="splash__img" src="http://kanto-prime.s3.amazonaws.com/1c87961b4efb479dad97d2c3145542fc.jpg"></img></NavLink>
                    </div>
                    <div className="splash__link__container">
                        <NavLink className="splash__link" to="/category/figures"><img className="splash__img" src="http://kanto-prime.s3.amazonaws.com/9d4a4d15f0c74d188a19613c09b8538f.jpg"></img></NavLink>
                    </div>
                    <div className="splash__link__container">
                        <NavLink className="splash__link" to="/category/games"><img className="splash__img" src="http://kanto-prime.s3.amazonaws.com/13ed417e8cc445d3b4ddb0f7da971b5c.jpg"></img></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SplashPage
