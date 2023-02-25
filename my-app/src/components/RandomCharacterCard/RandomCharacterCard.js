import React, { useEffect, useState } from 'react';
import './RandomCharacterCard.css'
import {Container, Row, Col} from 'react-bootstrap'
import MarvelService from '../../services/MarvelService';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';


const RandomCharacterCard = () => {
    const [char, setChar] = useState({})
    const [isFetching, setFetching] = useState(true)
    const [hasError, setError] = useState(false)
    const service = new MarvelService()
    useEffect(() => {
        updateCharacter()
    }, [])
    const onCharLoaded = (char) => {
        setChar(char)
        setFetching(false)
    }
    const onCharLoading = () => {
        setFetching(true)
    }
    const onError = () => {
        setFetching(false)
        setError(true)
    }
    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        onCharLoading()
        service.getCharacter(id).then(onCharLoaded).catch(onError)
    }
    const error = hasError ? <Error/> : null
    const fetching = isFetching ? <Preloader/> : null
    const content = !(error || fetching) ? <View data={char}/> : null
    return(
        <Container className='container'>
            <Row>
                <Col className='character-card-col-1'>
                    {error}
                    {fetching}
                    {content}
                </Col>
            <Col className='character-card-col-2'>
                <div>
                    <div className='character-card-col-text'>
                        Random character for today!
                    </div>
                    <div className='character-card-col-text'>
                        Do you want to get to know him better?
                    </div>
                    <div className='character-card-col-text-2'>
                        Or choose another one
                    </div>
                    <button className='btn-1' onClick={updateCharacter}>TRY IT</button>
                </div>
                <div>
                    <img src="../../../img/mjolnir.png" alt="" />
                </div>

            </Col>
            </Row>
        </Container>
    )
}

const View = (props) => {
    const {thumbnail, name, description, homepage, wiki} = props.data
    return(
        <>
            <div>
                <img className='character-card-img' src={thumbnail} alt={name} />
            </div>
            <div className='character-card-col-1-info'>
                <h2>{name}</h2>
                <p>{description}</p>
                <div className='character-card-btn'>
                    <a href={homepage} className='btn-1'>HOMEPAGE</a>
                    <a href={wiki} className='btn-2'>WIKI</a>
                </div>
            </div>
        </>
    )
}

export default RandomCharacterCard