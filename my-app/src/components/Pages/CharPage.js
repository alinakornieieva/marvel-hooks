import { useState } from 'react'
import RandomCharacterCard from '../RandomCharacterCard/RandomCharacterCard'
import Cards from '../Cards/Cards'
import Info from '../Info/Info'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import FindChar from '../FindChar/FindChar'
import { Helmet } from 'react-helmet'

const CharPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const recieveCharId = (id) => {
      setSelectedChar(id)
    }
    return(
      <>
       <Helmet>
            <meta
            name="description"
            content='Marvel information portal - characters page'
            />
            <title>Marvel characters</title>
        </Helmet>
      <ErrorBoundary>
          <RandomCharacterCard/>
        </ErrorBoundary>
        <div className='cards-info'>
          <ErrorBoundary>
            <Cards recieveCharId={recieveCharId}/>
          </ErrorBoundary>
          <div>
            <ErrorBoundary>
              <Info charId={selectedChar}/>
            </ErrorBoundary>
            <FindChar />
          </div>
        </div> 
      </>
    )
}

export default CharPage