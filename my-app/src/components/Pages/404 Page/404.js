import { NavLink } from "react-router-dom"
import Error from "../../Error/Error"
import './404.css'

const PageNotFound = () => {
    return(
        <div className="page-not-found">
            <Error/>
            <NavLink className='navlink-not-found-page' to='/'><div>Back to homepage</div></NavLink>
        </div>
    )
}

export default PageNotFound