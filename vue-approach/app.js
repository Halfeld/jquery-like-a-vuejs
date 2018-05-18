((Vue) => {
  
  'use strict'

  const HTTPClient = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs',
    params: {
      api_key: 'Ullp11IXdNXpv3Y1lw6chNunQZcSvXch',
      rating: 'G'
    }
  })

  /**
   * Create a standard to iterate
   */
  const parseGiphyResponse = ({ data }) =>
    data.map((currentGif) => currentGif.images.fixed_width)
  
  
  new Vue({
    el: '#app',
    data: () => ({
      limit: '5',
      q: '',
      gifs: []
    }),
    async mounted () {
      const params = { limit: this.limit }
      try {
        const { data: trendingReponse } = await HTTPClient.get('/trending', { params })
        const gifsFormated = parseGiphyResponse(trendingReponse)
        this.gifs = gifsFormated
      } catch (responseError) {
        console.log('* Something happen..', responseError)
      }
    },
    methods: {
      async search () {
        const params = { limit: this.limit, q: this.q }
        try {
          const { data: searchResponse } = await HTTPClient.get('/search', { params })
          const gifsFormated = parseGiphyResponse(searchResponse)
          this.gifs = gifsFormated
        } catch (responseError) {
          console.log('* Something happen..', responseError)
        }
      }
    }
  })
})(Vue)