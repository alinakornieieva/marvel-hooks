import { Component } from 'react'
import './CardItem.css'

class CardItem extends Component {
    onCardClick = (e) => {
        // console.log(e.target.closest('div'))
        // e.target.closest('div').classList.toggle.
        // console.log(this.props.data.id)
        this.props.recieveCharId(this.props.data.id)
        // e.target.closest('.main-click-div').classList.add('selected-card')
        // console.log(this.props.i)
        // this.arr.push(this.props.i)
    }
    itemRefs = []
    setRef = (ref) => {
        this.itemRefs.push(ref)
    }
    // focusOnCard = (id) => {
    //     this.itemRefs.forEach((item) => item.classList.remove('selected-card'))
    //     this.itemRefs[id].classList.add('selected-card')
    //     // this.itemRefs[id].focus()
    // }
    render() {
        return(
            <div ref={this.setRef} className='main-click-div' onClick={this.onCardClick}> 
                <img style={{width: '200px', height: '200px'}} src={this.props.data.thumbnail} alt={this.props.data.name} />
                <div className='card-item-name'>
                    {this.props.data.name}
                </div>
            </div>
        )
    }
}

export default CardItem


// const CardItem = (props) => {
//     return(
//         <div>
//             <div>
//                 <img style={{width: '200px', height: '200px'}} src={props.data.thumbnail} alt="character-image" />
//             </div>
//             <div className='card-item-name'>
//                 {props.data.name}
//             </div>
//         </div>
//     )
// }