<template>
  <input class="mcp-ai">
  <a class="feel-lucky">search</a>
</template>

<script>
import { getAudioStatus } from '../vuex/getters.js'
import { getSongInfo } from '../vuex/getters.js'
import { getAudioProgress } from '../vuex/getters.js'
import { updateAudioProgress } from '../vuex/actions.js'

export default {
  data () {
    return {
      audio: document.createElement('audio')
    }
  },
  vuex: {
    actions: {
      updateAudioProgress: updateAudioProgress
    },
    getters: {
      isStart: getAudioStatus,
      songInfo: getSongInfo,
      audioProgress: getAudioProgress
    }
  },
  ready () {
    this.audio.src = this.songInfo.url
    this.audio.updateAudioProgress = this.updateAudioProgress
    this.audio.audioProgress = this.audioProgress
    this.audio.addEventListener('timeupdate', function() {
      this.audioProgress.currentTime = this.currentTime
      this.audioProgress.length = this.duration
      this.audioProgress.completionRate = this.currentTime * 100 / this.duration
      this.updateAudioProgress(this.audioProgress)
    })
  },
  watch: {
    isStart: function (val) {
      val ? this.audio.play() : this.audio.pause()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
audio {
  display: none;
}
.mcp-ai {
  border-radius: 3px;
  outline: none;
  box-shadow: 1px 1px #fff inset;
}
.feel-lucky {
  cursor: pointer;
  text-decoration: none;
  -moz-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  -khtml-user-select:none;
  user-select:none;
}
</style>
