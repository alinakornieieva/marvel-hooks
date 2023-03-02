import './SingleFindChar.css'

const SingleFindChar = (props) => {
    return(
        <div className="single-char">
            <img src={props.data.thumbnail} alt="character" />
            <div>
                <div>{props.data.name}</div>
                <div>{props.data.description}</div>
            </div>
        </div>
    )
}

export default SingleFindChar