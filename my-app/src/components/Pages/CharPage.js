import { useState } from 'react'
import RandomCharacterCard from '../RandomCharacterCard/RandomCharacterCard'
import Cards from '../Cards/Cards'
import Info from '../Info/Info'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import FindChar from '../FindChar/FindChar'

const CharPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const recieveCharId = (id) => {
      setSelectedChar(id)
    }
    return(
      <>
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