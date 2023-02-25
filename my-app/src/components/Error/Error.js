import errorImg from './error.gif'

const Error = () => {
    return(
        <>
            <img src={errorImg} style={{ display: 'block', margin: '0 auto', width: "200px", height: "200px", objectFit: 'contain'}} alt="Error" />
        </>
    )
}

export default Error