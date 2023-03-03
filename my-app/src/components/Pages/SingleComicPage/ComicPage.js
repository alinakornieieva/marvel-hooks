import './ComicPage.css'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const ComicPage = (props) => {
    return(
        <div className='comic-page'>
             <Helmet>
                <meta
                name="description"
                content={`Marvel comic - ${props.data.title}`}
                />
                <title>{props.data.title}</title>
            </Helmet>
            <img src={props.data.img} alt="comic" />
            <div>
                <p className="comic-title">{props.data.title}</p>
                <p>{props.data.description}</p>
                <p>{props.data.pageCount}</p>
                <p>Language: {props.data.language}</p>
                <p className="comic-price">{props.data.price}</p>
                <NavLink to='/comics'><button className='btn-1'>BACK TO COMICS PAGE</button></NavLink>
            </div>
        </div>
    )
}


export default ComicPage