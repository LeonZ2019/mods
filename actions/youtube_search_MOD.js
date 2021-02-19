module.exports = {
  name: 'YouTube Search',
  section: 'Audio Control',

  subtitle (data) {
    const videoInfo = ['Video ID', 'Video URL', 'Video Title', 'Video Description', 'Video Channel ID', 'Video Channel URL', 'Video Channel Name', 'Video Thumbnail URL', 'Video Duration', 'Video Publish Data', 'Video Views', 'Video is live?']
    const playlistInfo = ['Playlist ID', 'Playlist URL', 'Playlist Name', 'Playlist Description', 'Playlist Thumbnail URL (Default)', 'Playlist Thumbnail URL (Medium)', 'Playlist Thumbnail URL (High)', 'Playlist Channel ID', 'Playlist Channel URL', 'Playlist Channel Name', 'Playlist Channel Thumbnail URL (Default)', 'Playlist Channel Thumbnail URL (Medium)', 'Playlist Channel Thumbnail URL (High)', 'Video IDs', 'Video URLs', 'Video Titles', 'Video Descriptions', 'Video Channel IDs', 'Video Channel URls', 'Video Channel Names', 'Video Channel Thumbnail URLs (Default)', 'Video Channel Thumbnail URLs (Medium)', 'Video Channel Thumbnail URLs (High)', 'Video Thumbnail URLs (Default)', 'Video Thumbnail URLs (Medium)', 'Video Thumbnail URLs (High)', 'Video Positions', 'Video Publish Dates']
    if (parseInt(data.type) === 1) {
      return `${playlistInfo[parseInt(data.info1)]}`
    } else {
      return `${videoInfo[parseInt(data.info0)]}`
    }
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    let dataType = 'Unknown Type'
    switch (parseInt(data.type)) {
      case 0: // Video
        // ----------------------------
        switch (parseInt(data.info0)) {
          case 0: // Video ID
          case 2: // Video Title
          case 3: // Video Description
          case 4: // Video Channel ID
          case 6: // Video Channel Name
          case 17: // Video Duration
          case 18: // Video Publish Date
            dataType = 'Text'
            break
          case 1: // Video URL
          case 5: // Video Channel URL
            dataType = 'URL'
            break
          case 7: // Video Thumbnail URL
            dataType = 'Image URL'
            break
          case 24: // Video is live?
            dataType = 'Boolean'
            break
          case 19: // Video Views
            dataType = 'Number'
            break
        }
        break
      case 1: // Playlist
        // ----------------------------
        switch (parseInt(data.info1)) {
          case 0: // Playlist ID
          case 2: // Playlist Name
          case 3: // Playlist Description
          case 7: // Playlist Channel ID
          case 9: // Playlist Channel Name
            dataType = 'Text'
            break
          case 1: // Playlist URL
          case 8: // Playlist Channel URL
            dataType = 'URL'
            break
          case 4: // Playlist Thumbnail URL (Default)
          case 5: // Playlist Thumbnail URL (Medium)
          case 6: // Playlist Thumbnail URL (High)
          case 10: // Playlist Channel Thumbnail URL (Default)
          case 11: // Playlist Channel Thumbnail URL (Medium)
          case 12: // Playlist Channel Thumbnail URL (High)
            dataType = 'Image URL'
            break
          case 13: // Video IDs
          case 14: // Video URLs
          case 15: // Video Titles
          case 16: // Video Descriptions
          case 17: // Video Channel IDs
          case 18: // Video Channel URLs
          case 19: // Video Channel Names
          case 20: // Video Channel Thumbnail URLs (Default)
          case 21: // Video Channel Thumbnail URLs (Medium)
          case 22: // Video Channel Thumbnail URLs (High)
          case 23: // Video Thumbnail URLs (Default)
          case 24: // Video Thumbnail URLs (Medium)
          case 25: // Video Thumbnail URLs (High)
          case 26: // Video Positions
          case 27: // Video Publish Dates
            dataType = 'List'
            break
        }
        break
    }
    return ([data.varName, dataType])
  },

  fields: ['type', 'input', 'info0', 'info1', 'results', 'storage', 'varName', 'iffalse', 'iffalseVal'],

  html (isEvent, data) {
    return `
<div style="width: 550px; height: 350px; overflow-y: scroll; overflow-x: hidden;">
  <div style="float: left; width: 30%; padding-top: 8px;">
    Source Type:<br>
    <select id="type" class="round" onchange="glob.onChange1(this)">
      <option value="0" selected>YouTube Video</option>
      <option value="1">YouTube Playlist</option>
    </select>
  </div>
  <div style="float: left; width: 99%; padding-top: 8px;">
    <span id="tempName">Video</span> to search:<br>
    <textarea id="input" rows="2" placeholder="Insert your url or keywords in here..." style="width: 95%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
  </div>
  <div id="divinfo0" style="float: left; width: 94%; padding-top: 8px;">
    Source Video Info:<br>
    <select id="info0" class="round">
      <option value="0">Video ID</option>
      <option value="1" selected>Video URL</option>
      <option value="2">Video Title</option>
      <option value="3">Video Description</option>
      <option value="4">Video Channel ID</option>
      <option value="5">Video Channel URL</option>
      <option value="6">Video Channel Name</option>
      <option value="7">Video Thumbnail URL</option>
      <option value="17">Video Duration</option>
      <option value="18">Video Publish Date</option>
      <option value="19">Video Views</option>
      <option value="24">Video is Live?</option>
    </select>
  </div>
  <div id="divinfo1" style="float: left; width: 94%; padding-top: 8px;">
    Source Playlist Info:<br>
    <select id="info1" class="round">
      <option value="0">Playlist ID</option>
      <option value="1" selected>Playlist URL</option>
      <option value="2">Playlist Name</option>
      <option value="3">Playlist Description</option>
      <option value="4">Playlist Thumbnail URL (Default)</option>
      <option value="5">Playlist Thumbnail URL (Medium)</option>
      <option value="6">Playlist Thumbnail URL (High)</option>
      <option value="7">Playlist Channel ID</option>
      <option value="8">Playlist Channel URL</option>
      <option value="9">Playlist Channel Name</option>
      <option value="13">Video IDs</option>
      <option value="14">Video URLs</option>
      <option value="15">Video Titles</option>
      <option value="16">Video Descriptions</option>
      <option value="17">Video Channel IDs</option>
      <option value="18">Video Channel URLs</option>
      <option value="19">Video Channel Names</option>
      <option value="23">Video Thumbnail URLs (Default)</option>
      <option value="24">Video Thumbnail URLs (Medium)</option>
      <option value="25">Video Thumbnail URLs (High)</option>
      <option value="27">Video Publish Dates</option>
    </select>
  </div>
  <div id="divresults" style="float: left; width: 94%; padding-top: 8px;">
    Result Number:<br>
    <select id="results" class="round">
      <option value="1">1st Result</option>
      <option value="2">2nd Result</option>
      <option value="3">3rd Result</option>
      <option value="4">4th Result</option>
      <option value="5">5th Result</option>
      <option value="6">6th Result</option>
      <option value="7">7th Result</option>
      <option value="8">8th Result</option>
      <option value="9">9th Result</option>
      <option value="10">10th Result</option>
      <option value="11">11th Result</option>
      <option value="12">12th Result</option>
      <option value="13">13th Result</option>
      <option value="14">14th Result</option>
      <option value="15">15th Result</option>
      <option value="16">16th Result</option>
      <option value="17">17th Result</option>
      <option value="18">18th Result</option>
      <option value="19">19th Result</option>
      <option value="20">20th Result</option>
    </select>
  </div>
  <div>
    <div style="float: left; width: 35%;  padding-top: 8px;">
      Store In:<br>
      <select id="storage" class="round">
        ${data.variables[1]}
      </select>
    </div>
    <div style="float: right; width: 60%; padding-top: 8px;">
      Variable Name:<br>
      <input id="varName" class="round" type="text">
    </div>
  </div>
  <div style="float: left; width: 35%; padding-top: 10px;">
    If <span id="tempName2">Video</span> Wasn't Found:<br>
    <select id="iffalse" class="round" onchange="glob.onChangeFalse(this)">
      <option value="0" selected>Continue Actions</option>
      <option value="1">Stop Action Sequence</option>
      <option value="2">Jump To Action</option>
      <option value="3">Skip Next Actions</option>
      <option value="4">Jump To Anchor</option>
    </select>
  </div>
  <div id="iffalseContainer" style="display: none; float: right; width: 60%; padding-top: 10px;">
    <span id="iffalseName">Action Number</span>:<br><input id="iffalseVal" class="round" type="text">
  </div>
</div>`
  },

  init () {
    const { glob, document } = this
    glob.onChange1 = function (event) {
      // Load [Source Video Info], [Source Playlist Info], [API Key], [Max Results]
      const videoDiv = document.getElementById('divinfo0')
      const video = document.getElementById('info0')
      const playlistDiv = document.getElementById('divinfo1')
      const playlist = document.getElementById('info1')
      let result
      switch (parseInt(event.value)) { // Show: [Source Video Info] Hide: [Source Playlist Info], [Max Results]
        case 0:
          result = 'Video'
          video.style.display = null
          videoDiv.style.display = null
          playlist.style.display = 'none'
          playlistDiv.style.display = 'none'
          break
        case 1: // Show: [Source Playlist Info], [Max Results] Hide: [Source Video Info]
          result = 'Playlist'
          video.style.display = 'none'
          videoDiv.style.display = 'none'
          playlist.style.display = null
          playlistDiv.style.display = null
          break
      }
      document.getElementById('tempName').innerHTML = result // Replace text with [Video/Playlist]
      document.getElementById('tempName2').innerHTML = result
    }
    glob.onChangeFalse = function (event) {
      switch (parseInt(event.value)) {
        case 0:
        case 1:
          document.getElementById('iffalseContainer').style.display = 'none'
          break
        case 2:
          document.getElementById('iffalseName').innerHTML = 'Action Number'
          document.getElementById('iffalseContainer').style.display = null
          break
        case 3:
          document.getElementById('iffalseName').innerHTML = 'Number of Actions to Skip'
          document.getElementById('iffalseContainer').style.display = null
          break
        case 4:
          document.getElementById('iffalseName').innerHTML = 'Anchor ID'
          document.getElementById('iffalseContainer').style.display = null
          break
      }
    }
    glob.onChange1(document.getElementById('type'))
    glob.onChangeFalse(document.getElementById('iffalse'))
  },

  async action (cache) {
    const data = cache.actions[cache.index]
    const Mods = this.getMods() // As always.
    const input = this.evalMessage(data.input, cache) // URL or Keywords
    const type = parseInt(data.type) // 0: Video | 1: Playlist
    const info0 = parseInt(data.info0) // Video
    const info1 = parseInt(data.info1) // Playlist
    const index = parseInt(data.results) // Number within 1 to 10
    // removed due the api stuff const YTapi = Mods.require('simple-youtube-api')
    const ytpl = Mods.require('ytpl')
    const ytsr = Mods.require('ytsr')
    const TimeFormat = Mods.require('hh-mm-ss')
    if (input === undefined || input === '') return this.executeResults(false, data, cache)
    switch (type) {
      case 0: {// Video
        try {
          const searchResults = await ytsr(input, { limit: 20 })
          if (searchResults.items.length < index) return this.executeResults(false, data, cache)
          const video = searchResults.items[index - 1]
          let result
          switch (info0) {
            case 0: // Video ID
              result = video.url.id
              break
            case 1: // Video URL
              result = video.url
              break
            case 2: // Video Title
              result = video.title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
              break
            case 3: // Video Description
              result = video.description.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
              break
            case 4: // Video Channel ID
              result = video.author.channelID
              break
            case 5: // Video Channel URL
              result = video.author.url
              break
            case 6: // Video Channel Name
              result = video.author.name
              break
            case 7: // Thumbnail URL (Default)
              result = video.thumbnail[0].url
              break
            case 17: // Video Duration
              result = TimeFormat.toS(video.duration)
              break
            case 18: // Video Publish Date
              result = video.uploadedAt
              break
            case 19: // Video Views
              result = video.views
              break
            case 24: // is live?
              result = video.live
              break
            default:
              return console.log('Please check your YouTube Search action... There is something wrong.')
          }
          if (result !== undefined) {
            const storage = parseInt(data.storage)
            const varName = this.evalMessage(data.varName, cache)
            this.storeValue(result, storage, varName, cache)
            this.callNextAction(cache)
          } else {
            this.executeResults(false, data, cache)
          }
        } catch (err) {
          this.displayError(data, cache, err)
        }
        break
      }
      case 1: {// Playlist
        try {
          const filterSearch = await ytsr.getFilters(input)
          const filterType = filterSearch.get('Type').get('Playlist')
          const playlists = await ytsr(filterType.url,{ limit: 20 })
          let result
          if (playlists.items.length < index) return this.executeResults(false, data, cache)
          const playlist = playlists.items[index - 1]
          switch (info1) {
            case 0: // Playlist ID
              result = playlist.playlistID
              break
            case 1: // Playlist URL
              result = playlist.url
              break
            case 2: // Playlist Name
              result = playlist.title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
              break
            case 3: // Playlist Description // wtf is playlist description?
              result = playlist.description.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
              break
            case 4: // Playlist Thumbnail URL (Default)
              result = playlist.firstVideo.bestThumbnail.url
              break
            case 5: // Playlist Thumbnail URL (Medium)
              result = playlist.firstVideo.thumbnails[1].url
              break
            case 6: // Playlist Thumbnail URL (High)
              result = playlist.firstVideo.thumbnails[2].url
              break
            case 7: // Playlist Channel ID
              result = playlist.owner.url.replace('https://www.youtube.com/watch?v=', '')
              break
            case 8: // Playlist Channel URL
              result = playlist.owner.url
              break
            case 9: // Playlist Channel Name
              result = playlist.owner.name
              break
            /* case 10: // Playlist Channel Thumbnail URL (Default) 
              result = playlist.channel.raw.snippet.thumbnails.default.url
              break
            case 11: // Playlist Channel Thumbnail URL (Medium)
              result = playlist.channel.raw.snippet.thumbnails.medium.url
              break
            case 12: // Playlist Channel Thumbnail URL (High)
              result = playlist.channel.raw.snippet.thumbnails.high.url
              break*/
            default: {
              const playlist = await ytpl(url)
              const videos = playlist.items
              result = []
              videos.forEach((video) => {
                switch (info1) {
                  case 13: // Video IDs
                    result.push(video.id)
                    break
                  case 14: // Video URLs
                    result.push(video.shortUrl)
                    break
                  case 15: // Video Titles
                    result.push(video.title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'"))
                    break
                  case 16: // Video Descriptions // wut no description...
                    result.push(video.description.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'"))
                    break
                  case 17: // Video Channel IDs
                    result.push(video.author.channelID)
                    break
                  case 18: // Video Channel URLs
                    result.push(video.author.url)
                    break
                  case 19: // Video Channel Names
                    result.push(video.author.name)
                    break
                  /* case 20: // Video Channel Thumbnail URLs (Default)
                    result.push(video.channel.raw.snippet.thumbnails.default.url)
                    break
                  case 21: // Video Channel Thumbnail URLs (Medium)
                    result.push(video.channel.raw.snippet.thumbnails.medium.url)
                    break
                  case 22: // Video Channel Thumbnail URLs (High)
                    result.push(video.channel.raw.snippet.thumbnails.high.url) */
                    break
                  case 23: // Video Thumbnail URLs (Default)
                    result.push(video.bestThumbnail.url)
                    break
                  case 24: // Video Thumbnail URLs (Medium)
                    result.push(video.thumbnails[2].url)
                    break
                  case 25: // Video Thumbnail URLs (High)
                    result.push(video.thumbnails[1].url)
                    break
                  /* case 26: // Video Positions
                    result.push(video.index)
                    break */
                  case 27: // Video Publish Dates
                    result.push(video.publishedAt)
                    break
                  case 28: // video duration in second
                    result.push(video.durationSec)
                    break
                  default:
                    return console.log('Please check your YouTube Search action... There is something wrong.')
                }
              })
              break
            }
          }
          if (typeof result === 'array' && result.length > 0 ||typeof result === 'string' && result !== undefined) {
            const storage = parseInt(data.storage)
            const varName = this.evalMessage(data.varName, cache)
            this.storeValue(result, storage, varName, cache)
            this.callNextAction(cache)
          } else {
            this.executeResults(false, data, cache)
          }
        } catch (err) {
          console.error(err)
          this.displayError(data, cache, err)
        }
        break
      }
      default:
        return console.log('Please check your YouTube Search action... There is something wrong.')
    }
  },

  mod () {}
}
