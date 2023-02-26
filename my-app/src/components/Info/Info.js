import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService'
import './Info.css'
import Error from '../Error/Error'
import Preloader from '../Preloader/Preloader'
import Skeleton from '../Skeleton/Skeleton'

const Info = (props) => {
    const [char, setChar] = useState(null)
    const {error, fetching, getCharacter, clearError} = useMarvelService()
    
    useEffect(() => {
        updateCharacter()
    }, [props.charId])
    const updateCharacter = () => {
        if (!props.charId) {
            return
        }
        clearError()
        getCharacter(props.charId).then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char)
    }
    const errorMessage = error ? <Error/> : null
    const spinner = fetching ? <Preloader/> : null
    const content = !(errorMessage || spinner || !char) ? <View data={char}/> : null
    const skeleton = errorMessage || spinner || char ? null : <Skeleton/> 
    return(
        <div className="info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    )
}

const View = (props) => {
    return(
        <>
            <div className="info-first-section">
                    <img className="info-img" src={props.data.thumbnail} alt={props.data.name} />
                    <div>
                    <h2>{props.data.name}</h2>
                    <div className="info-btns">
                    <a href={props.data.homepage} className='btn-1'>HOMEPAGE</a>
                    <a href={props.data.wiki} className='btn-2'>WIKI</a>
                    </div>
                    </div>
                </div>
                <p>{props.data.description}</p>
                {props.data.comics.length > 0 ? <>
                <div className='info-comics'>Comics:</div>
                    <ul>
                        {props.data.comics.map((item, i) => <li key={i}>{item.name}</li>) }
                    </ul></> : null
                }
        </>
    )
}

Info.propTypes = {
    charId: PropTypes.number
}

export default Info