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
      btnClickNumber: 0,
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
      audioEnded: audioCtrlApi.endedAudioPlayStatus,
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
      this.updateSongKey(this.songKey + 1);
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
    this.audio.audioEnded = this.audioEnded;
    this.audio.addEventListener('ended', function() {
      this.stopAudio();
      this.audioEnded();
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
            this.stopAudio();
            break;
          case 1:
            //通过progress事件反复跟踪readystate

            //定义一个判断是否播放成功的变量
            let isSuccess = false;

            this.audio.playAudio = this.playAudio;
            const reTryPlay = function () {
              if (this.readyState == 4) {
                this.playAudio();
                isSuccess = true;
                this.removeEventListener('progress', reTryPlay);
              }
            };

            //10s之后如果仍然不行，抛出错误
            const retryTime = 10000;
            //对于匿名函数，定义一个指向audio的指针
            let audio = this.audio;
            audio.playAudio = this.playAudio;
            audio.addEventListener('progress', reTryPlay);
            setTimeout(function () {
              if (!isSuccess) {
                audio.playAudio();
              }
              audio.removeEventListener('progress', reTryPlay);
            }, retryTime);
            break;
          case 2:
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
      //切换按钮每点一次，此计数器＋1
      this.btnClickNumber++;

      this.stopAudio();
      navigator.userAgent.indexOf('Chrome') > -1
      ? this.audio.src = this.songInfo[this.songKey].url + '?mcp-t=' + new Date().getTime()
      : this.audio.src = this.songInfo[this.songKey].url;
      this.audio.playAudio = this.playAudio;
      this.audio.stopAudio = this.stopAudio;

      //被逼无奈之举，当用户点击多次后，无法取消之前的定时器，被迫选择了计数器
      let $this = this;
      const readyToPlay = setTimeout(function () {
        //多次点击后，计数器大于一，只有当计数器为一，即最后一次有效
        if ($this.btnClickNumber == 1) {
            $this.audio.playAudio();
        }
        //将点击计数－1，无效化一次点击事件
        $this.btnClickNumber > 0 ? $this.btnClickNumber-- : false;
        //多次点击之后各个定时器之间可能存在干扰导致计数器小于零，使得程序永远无法继续运转，因此加一个保险措施
        $this.btnClickNumber < 0 ? $this.btnClickNumber = 0 : false;
        $this.audio.removeEventListener('canplaythrough', readyToPlay);
      }, 2000);

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
