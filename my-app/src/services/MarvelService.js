import {useHttp} from '../hooks/http.hooks'

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=60697e47be7fb45d5993271fadf4e452'
    const _baseCharOffset = 210
    const _baseComicsOffset = 0

    const {request, error, fetching, clearError} = useHttp()
  
    const getAllCharacters = async (offset = _baseCharOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacterData)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacterData(res.data.results[0])
    }
    const getComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComicsData)
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComicsData(res.data.results[0])
    }
    const getCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacterData)
    }    
    const _transformComicsData = (res) => {
        return {
            id: res.id,
            title: res.title,
            price: res.prices[0].price === 0 ? 'Not available' : res.prices[0].price + '$',
            img: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            description: res.description || "There is no description",
			pageCount: res.pageCount ? `${res.pageCount} pages` : "No information about the number of pages",
            language: res.textObjects[0]?.language || "en-us"
        }
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
    return {error, fetching, getAllCharacters, getCharacter, clearError, getComics, getComic, getCharByName}
}

export default useMarvelService