import './SingleFindChar.css'
import { Helmet } from 'react-helmet'

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
            </div>
        </div>
    )
}

export default SingleFindChar