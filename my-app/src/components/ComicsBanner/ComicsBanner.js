import img from '../../resources/Avengers.png'
import logo from '../../resources/Avengers_logo.png'
import './ComicsBanner.css'

const ComicsBanner = () => {
    return(
        <div className='comics-banner'>
            <img src={img} alt="characters-banner" />
            <p>
                New comics every week!<br/>
                Stay tuned!
            </p>
            <img src={logo} alt="logo" />
        </div>
    )
}

export default ComicsBanner