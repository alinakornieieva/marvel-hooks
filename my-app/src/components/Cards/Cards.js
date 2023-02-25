import { Component } from "react"
import PropTypes from 'prop-types'
import MarvelService from "../../services/MarvelService"
import Preloader from "../Preloader/Preloader"
import CardItem from "./CardItem"
import Error from "../Error/Error"

class Cards extends Component{
    state = {
        charList: [],
        isFetching: true,
        hasError: false,
        offset: 210,
        newItemsLoading: false,
        listEnd: false
    }
    service = new MarvelService()
    componentDidMount() {
        this.service.getAllCharacters()
        .then(this.onFirstCharListLoaded).catch(this.onError)

    }
    onFirstCharListLoaded = (newItems) => {
        this.setState(({offset}) => ({
            charList: [...newItems],
            newItemsLoading: false,
            isFetching: false,
            offset: offset + 9,
        }))
    }
    onRequest = (offset) => {
        this.onCharListLoading()
        this.service.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }
    onCharListLoaded = (newItems) => {
        let ended = false
        if (newItems.length < 9) {
            ended = true
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newItems],
            newItemsLoading: false,
            isFetching: false,
            offset: offset + 9,
            listEnd: ended
        }))
    }
    onError = () => {
        this.setState({
            hasError: true,
            isFetching: false
        })
    }
    render() {
        const loading = this.state.isFetching ? <Preloader/> : null
        const error = this.state.hasError ? <Error/> : null
        const content = !(loading || error) ? <View listEnd={this.state.listEnd} onRequest={this.onRequest} offset={this.state.offset} newItemsLoading={this.state.newItemsLoading} data={this.state.charList} recieveCharId={this.props.recieveCharId}/> : null
        return(
            <div className="cards">
                {loading}
                {error}
                {content}
            </div>
        )
    }
}

class View extends Component {
    itemRef = []
    setRef = (ref) => {
        this.itemRef.push(ref)
    }
    // onCardClick = () => {
    //     // debugger
    //     this.props.recieveCharId(this.props.data.id)
    //     // console.log(this.props.data)
    // }
    onFocus = (id) => {
        this.itemRef.forEach(item => item.classList.remove('selected-card'))  
        this.itemRef[id].classList.add('selected-card')
    }
    render() {
        return(
            <>
                <div className="cards-grid">
                    {this.props.data.map((item, i)=>
                      <div ref={this.setRef}
                      key={item.id}
                      onClick={() => {
                        this.onFocus(i)
                        this.props.recieveCharId(item.id)}}> 
                    <img style={{width: '200px', height: '200px'}} src={item.thumbnail} alt={item.name} />
                    <div className='card-item-name'>
                        {item.name}
                    </div>
                </div>
                      )}
    
                </div>
                <button className="btn-1" 
                style={{display: this.props.listEnd ? 'none' : 'block'}}
                onClick={() => this.props.onRequest(this.props.offset)}
                disabled={this.props.newItemsLoading}>LOAD MORE</button>
            </>
        )
    }
}

Cards.propTypes = {
    recieveCharId: PropTypes.func
}

export default Cards

// box-shadow: rgba(255, 0, 0, 0.16) 0px 10px 36px 0px, rgba(255, 0, 0, 0.06) 0px 0px 0px 1px;