import './SingleFindChar.css'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'

const SingleFindChar = (props) => {
    return(
        <div className="single-char">
            <Helmet>
                <meta
                name="description"
                content={`Marvel character - ${props.data.name}`}
                />
                <title>{props.data.name}</title>
            </Helmet>
            <img src={props.data.thumbnail} alt="character" />
            <div>
                <div className='title'>{props.data.name}</div>
                <div>{props.data.description}</div>
                <NavLink to={'/'}><button className='btn-1'>BACK TO CHARACTERS PAGE</button></NavLink>
            </div>
        </div>
    )
}

export default SingleFindChar