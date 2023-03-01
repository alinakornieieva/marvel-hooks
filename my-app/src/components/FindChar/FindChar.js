import './FindChar.css'

const FindChar = () => {
    return(
        <div className="find-char">
            <div className='find-char-title'>Or find a character by name:</div>
            <form className='form'>
                <input className='input' type="text" name="character" id="character" placeholder="Enter name"/>
                <button className="btn-1" type="submit">FIND</button>
            </form>

        </div>
    )
}

export default FindChar