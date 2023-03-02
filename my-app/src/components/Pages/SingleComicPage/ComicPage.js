import './ComicPage.css'
import { NavLink } from 'react-router-dom'

const ComicPage = (props) => {
    return(
        <div className='comic-page'>
            <img src={props.data.img} alt="comic" />
            <div>
                <p className="comic-title">{props.data.title}</p>
                <p>{props.data.description}</p>
                <p>{props.data.pageCount}</p>
                <p>Language: {props.data.language}</p>
                <p className="comic-price">{props.data.price}</p>
                <NavLink to='/comics'><div>Back to comics</div></NavLink>
            </div>
        </div>
    )
}


export default ComicPage