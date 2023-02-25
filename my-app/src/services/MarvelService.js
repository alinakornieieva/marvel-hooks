class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=60697e47be7fb45d5993271fadf4e452'
    _baseOffset = 210
    getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Error status is ${res.status}`)
        }
        return await res.json()
    }
    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacterData)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacterData(res.data.results[0])
    }
    _transformCharacterData = (res) => {
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
    // 1011196
}

export default MarvelService