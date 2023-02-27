import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return(
        <div className='header'>
            <div>
                <h1><span>Marvel</span> information portal</h1>
            </div>
            <span>
                <NavLink
                style={({isActive}) => ({'color': isActive ? '#9F0013' : 'inherit', textDecoration: 'none'})}
                to={'/'}><span>Characters</span></NavLink>
                /
                <NavLink
                style={({isActive}) => ({'color': isActive ? '#9F0013' : 'inherit', textDecoration: 'none'})}
                to={'/comics'}><span>Comics</span></NavLink>
            </span>
        </div>
    )
}

export default Header