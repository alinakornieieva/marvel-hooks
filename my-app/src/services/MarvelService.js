import {useHttp} from '../hooks/http.hooks'

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=60697e47be7fb45d5993271fadf4e452'
    const _baseOffset = 210

    const {request, error, fetching} = useHttp()
  
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacterData)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacterData(res.data.results[0])
    }
    const _transformCharacterData = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description ? `${res.description.slice(0, 200)}...` : 'No description yet',
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items ? res.comics.items.slice(0, 10) : null
        }
    }
    return {error, fetching, getAllCharacters, getCharacter}
}

export default useMarvelService