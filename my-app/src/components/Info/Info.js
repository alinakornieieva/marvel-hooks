import { Component } from 'react'
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService'
import './Info.css'
import Error from '../Error/Error'
import Preloader from '../Preloader/Preloader'
import Skeleton from '../Skeleton/Skeleton'

class Info extends Component {
    state = {
        char: null,
        isFetching: false,
        hasError: false
    }
    service = new MarvelService()
    componentDidMount() {
        // this.service.getCharacter(1011400).then(this.onCharLoaded).catch(this.onError)
        //this.props.charId
        // console.log('mount')
        // this.updateCharacter(1011400)
    }
    componentDidUpdate(prevProps) {
        // debugger 
        //чтобы посмотреть что в prevprops 
        // this.service.getCharacter(this.props.charId).then(this.onCharLoaded).catch(this.onError)
        // console.log('update')
        if (prevProps.charId !== this.props.charId) {
            this.updateCharacter()
        }
    }
    updateCharacter = () => {
        if (!this.props.charId) {
            return
        }
        this.onCharLoading()
        this.service.getCharacter(this.props.charId).then(this.onCharLoaded).catch(this.onError)
    }
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
            hasError: true,
            isFetching: false
        })
    }
    render() {
        const error = this.state.hasError ? <Error/> : null
        const fetching = this.state.isFetching ? <Preloader/> : null
        const content = !(error || fetching || !this.state.char) ? <View data={this.state.char}/> : null
        const skeleton = error || fetching || this.state.char ? null : <Skeleton/> 
        return(
            <div className="info">
                {error}
                {fetching}
                {content}
                {skeleton}
            </div>
        )
    }
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