# Now Playing Website

Docker image that display a Now Playing Screen based on the LastFM API created this project to learn and test websockets


**Endpoints**

[[server]/](https://nowplaying.rickarts.dev) Main stats screen

[[server]/current](https://nowplaying.rickarts.dev/current) Displays current song

[[server]/latest](https://nowplaying.rickarts.dev/latest) Shows current stats and latest songs overview

[[server]/disco/true](#) Enables disco mode

[[server]/disco/false](#) Disables disco mode

**Environment**
- LAST_FM_USER - LastFM username
- LAST_FM_API_KEY - LastFM api key
- WEBSOCKET_PROTOCOL - Websocket Protocl (default: wss)
- DISABLE_GIF - If set to 1 the fallback gifs will be disabled
- TOP_CHART_HIDE_IMAGES - Disables the top chart images (exluding recent tracks)
