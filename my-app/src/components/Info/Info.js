import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService'
import './Info.css'
import Error from '../Error/Error'
import Preloader from '../Preloader/Preloader'
import Skeleton from '../Skeleton/Skeleton'

const Info = (props) => {
    const [char, setChar] = useState(null)
    const [isFetching, setFetching] = useState(false)
    const [hasError, setError] = useState(false)
    const service = new MarvelService()
    useEffect(() => {
        updateCharacter()
    }, [props.charId])
    const updateCharacter = () => {
        if (!props.charId) {
            return
        }
        onCharLoading()
        service.getCharacter(props.charId).then(onCharLoaded).catch(onError)
    }
    const onCharLoaded = (char) => {
        setChar(char)
        setFetching(false)
    }
    const onCharLoading = () => {
        setFetching(true)
    }
    const onError = () => {
        setError(true)
        setFetching(false)
    }
    const error = hasError ? <Error/> : null
    const fetching = isFetching ? <Preloader/> : null
    const content = !(error || fetching || !char) ? <View data={char}/> : null
    const skeleton = error || fetching || char ? null : <Skeleton/> 
    return(
        <div className="info">
            {error}
            {fetching}
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