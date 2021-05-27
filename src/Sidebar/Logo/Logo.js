import "./Logo.css";
import { ReactComponent as ReactLogo} from "../../Assets/TMDB-Logo.svg"


const Logo = () => {
    return (
        <div className="logo" >
            <ReactLogo />
        </div>
    )
}

export default Logo;