<template>
  <input class="mcp-ai">
  <a class="feel-lucky" v-on:click="">search</a>
</template>

<script>
import audioCtrlApi from '../vuex/actions.js';
import audioDataApi from '../vuex/getters.js';

export default {
  data () {
    return {
      audio: document.createElement('audio'),
      retry: 0,
    };
  },
  vuex: {
    getters: {
      isStart: audioDataApi.getAudioStatus,
      songInfo: audioDataApi.getSongInfo,
      audioProgress: audioDataApi.getAudioProgress,
      songKey: audioDataApi.getSongKey,
    },
    actions: {
      playAudio: audioCtrlApi.play,
      stopAudio: audioCtrlApi.stop,
      updateSongKey: audioCtrlApi.updateSongKey,
      modelKey: audioDataApi.getPlayerModelKey,
      playerModel: audioDataApi.getPlayerModel,
    }
  },
  ready () {
    //根据不同浏览器初始化不同，确保兼容性
    navigator.userAgent.indexOf('Chrome') > -1
    ? this.audio.src = this.songInfo[this.songKey].url + '?mcp-t=' + new Date().getTime()
    : this.audio.src = this.songInfo[this.songKey].url;
    this.audio.preload = 'auto';
    
    //监测播放错误事件重置歌曲
    this.audio.updateSongKey = this.updateSongKey;
    this.audio.addEventListener('error', function() {
      console.log('播放失败，自动为您切换至下一首歌');
      this.updateSongKey(0);
    });

    this.audio.audioProgress = this.audioProgress;
    //监测下载事件显示缓存
    this.audio.addEventListener('progress', function() {
      this.readyState == 4
      ? this.audioProgress.bufferedRate = this.buffered.end(this.length - 1) * 100 / this.duration
      : false;
    });
    //监测播放更新事件显示进度条
    this.audio.addEventListener('timeupdate', function() {
      this.audioProgress.currentTime = this.currentTime;
      this.audioProgress.length = this.duration;
      this.audioProgress.completionRate = this.currentTime * 100 / this.duration;
    });

    //监测播放完成事件
    this.audio.stopAudio = this.stopAudio;
    this.audio.addEventListener('ended', function(){
      this.stopAudio();
    });
  },
  watch: {
    isStart: function (val) {
      if (this.audio.readyState == 4) {
        val ? this.audio.play() : this.audio.pause();
      } else {
        //未完成，暂时只case一个错误
        switch (this.retry)
        {
          case 0:
            console.log('播放失败，请重试');
            this.stopAudio();
            //重置播放器
            navigator.userAgent.indexOf('Chrome') > -1
            ? this.audio.src = this.songInfo[this.songKey].url + '?mcp-t=' + new Date().getTime()
            : this.audio.src = this.songInfo[this.songKey].url;
          break;
          default:
            this.retry = -1;
          break;
        }
        this.retry++;
      }
    },
    songKey: function (val) {
      navigator.userAgent.indexOf('Chrome') > -1
      ? this.audio.src = this.songInfo[this.songKey].url + '?mcp-t=' + new Date().getTime()
      : this.audio.src = this.songInfo[this.songKey].url;
      this.audio.playAudio = this.playAudio;
      const readyToPlay = function () {
        this.playAudio();
        this.removeEventListener('canplaythrough', readyToPlay);
      };
      this.audio.addEventListener('canplaythrough', readyToPlay);
    }
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
