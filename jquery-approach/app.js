(($) => {
  
  'use strict'

  const GIPHY_API_URI = 'https://api.giphy.com/v1/gifs'
  const API_KEY = 'Ullp11IXdNXpv3Y1lw6chNunQZcSvXch'

  /**
   * Create a standard to iterate
   */
  const parseGiphyResponse = ({ data }) => data.map((currentGif) => ({
    small: currentGif.images.fixed_width,
    original: currentGif.images.original
  }))


  /**
   * Get value from fields
   */
  const getValuesFromFields = () => ({
    q: $('#q').val(),
    limit: $('#limit').val()
  })
  
  /**
   * Add events
   */
  const addEventListeners = () => {
    $('#search').on('click', async () => {
      console.log('* Starting search..')

      const {
        q,
        limit
      } = getValuesFromFields()

      try {
        const searchResponse = await $.get(`${GIPHY_API_URI}/search?api_key=${API_KEY}&limit=${limit}&rating=G&q=${q}`)
        const gifFormated = parseGiphyResponse(searchResponse)

        console.log('* Search response', gifFormated)
        // Reseting
        $('#target').html('')

        // Append
        gifFormated.map(({ small }) => render(small))
      } catch (responseError) {
        console.log('* Ohh something happen..', responseError)
      }
    })
  }

  /**
   * Append gif on HTML 
   */
  const render = ({ url, width, height }) => {
    const html = `
      <img
        src="${url}"
        width="${width}"
        height="${height}" 
        class="gif">
      </img>
    `
    $('#target').append(html)
  }

  /**
   * Init call Giphy API
   */
  const startupApplication = async () => {
    // Add events
    addEventListeners()

    const { limit } = getValuesFromFields()

    try {
      const trendingReponse = await $.get(`${GIPHY_API_URI}/trending?api_key=${API_KEY}&limit=${limit}&rating=G`)
      const gifFormated = parseGiphyResponse(trendingReponse)

      console.log('* Trending response', gifFormated)

      // Append
      gifFormated.map(({ small }) => render(small))
    } catch (responseError) {
      console.log('* Ohh something happen..', responseError)
    }
  }


  startupApplication()
})(jQuery)