import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet"
import Error from "../../Error/Error"
import './404.css'

const PageNotFound = () => {
    return(
        <div className="page-not-found">
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal - page not found" 
                />
                <title>Page not found</title>
            </Helmet>
            <Error/>
            <NavLink className='navlink-not-found-page' to='/'><div>Back to homepage</div></NavLink>
        </div>
    )
}

export default PageNotFound