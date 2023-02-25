import loader from './loader.gif'
import './Preloader.css'

const Preloader = () => {
    return(
        <div className='preloader'>
            <img src={loader} style={{display: 'block', margin: '0 auto'}} alt="loader" />
        </div>
    )
}

export default Preloader