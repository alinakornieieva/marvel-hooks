import { useState } from 'react'
import RandomCharacterCard from '../RandomCharacterCard/RandomCharacterCard'
import Cards from '../Cards/Cards'
import Info from '../Info/Info'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

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
          <ErrorBoundary>
            <Info charId={selectedChar}/>
          </ErrorBoundary>
        </div> 
      </>
    )
}

export default CharPage