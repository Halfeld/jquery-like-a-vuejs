((Vue) => {
  
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
  
  
  new Vue({
    el: '#app'
  })
})(Vue)