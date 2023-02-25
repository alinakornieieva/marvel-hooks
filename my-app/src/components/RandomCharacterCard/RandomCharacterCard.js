import React, { Component } from 'react';
import './RandomCharacterCard.css'
import {Container, Row, Col} from 'react-bootstrap'
import MarvelService from '../../services/MarvelService';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';


class RandomCharacterCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: {},
            isFetching: true,
            hasError: false
        }
    }
    componentDidMount() {
        this.updateCharacter()
    }
    service = new MarvelService()
    onCharLoaded = (char) => {
        this.setState({
            char,
            isFetching: false
        })
    }
    onCharLoading = () => {
        this.setState({
            isFetching: true
        })
    }
    onError = () => {
        this.setState({
            isFetching: false,
            hasError: true
        })
    }
    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.onCharLoading()
        this.service.getCharacter(id).then(this.onCharLoaded).catch(this.onError)
    }
    render() {
        const error = this.state.hasError ? <Error/> : null
        const fetching = this.state.isFetching ? <Preloader/> : null
        const content = !(error || fetching) ? <View data={this.state.char}/> : null
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
                        <button className='btn-1' onClick={this.updateCharacter}>TRY IT</button>
                    </div>
                    <div>
                        <img src="../../../img/mjolnir.png" alt="" />
                    </div>
    
                </Col>
                </Row>
            </Container>
        )
    }
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