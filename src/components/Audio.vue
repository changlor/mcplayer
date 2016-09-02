<template>
  <input class="mcp-ai">
  <a class="feel-lucky" v-on:click="">search</a>
</template>

<script>
import audioDataApi from '../vuex/getters.js';

export default {
  data () {
    return {
      audio: document.createElement('audio'),
    };
  },
  vuex: {
    getters: {
      isStart: audioDataApi.getAudioStatus,
      songInfo: audioDataApi.getSongInfo,
      audioProgress: audioDataApi.getAudioProgress,
    }
  },
  ready () {
    navigator.userAgent.indexOf('Chrome') > -1
    ? this.audio.src = this.songInfo.url + '?mcp-t=' + new Date().getTime()
    : this.audio.src = this.songInfo.url;
    this.audio.preload = 'auto';
    this.audio.audioProgress = this.audioProgress;
    this.audio.addEventListener('progress', function() {
      this.readyState == 4
      ? this.audioProgress.bufferedRate = this.buffered.end(this.length - 1) * 100 / this.duration
      : false;
    });
    this.audio.addEventListener('timeupdate', function() {
      this.audioProgress.currentTime = this.currentTime;
      this.audioProgress.length = this.duration;
      this.audioProgress.completionRate = this.currentTime * 100 / this.duration;
    });
  },
  watch: {
    isStart: function (val) {
      val ? this.audio.play() : this.audio.pause()
    },
  },
};
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
