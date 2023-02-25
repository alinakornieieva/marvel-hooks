import { useRef } from "react"
import './Cards.css'

const CardItems = (props) => {
    const itemRef = useRef([])
    const onFocus = (id) => {
        itemRef.current.forEach(item => item.classList.remove('selected-card'))  
        itemRef.current[id].classList.add('selected-card')
    }
    return(
        <>
            <div className="cards-grid">
                {props.data.map((item, i)=>
                  <div ref={(el) => itemRef.current[i] = el}
                  key={item.id}
                  onClick={() => {
                    onFocus(i)
                    props.recieveCharId(item.id)}}> 
                <img style={{width: '200px', height: '200px'}} src={item.thumbnail} alt={item.name} />
                <div className='card-item-name'>
                    {item.name}
                </div>
            </div>
                  )}

            </div>
            <button className="btn-1" 
            style={{display: props.listEnd ? 'none' : 'block'}}
            onClick={() => props.onRequest(props.offset)}
            disabled={props.newItemsLoading}>LOAD MORE</button>
        </>
    )
}

export default CardItems