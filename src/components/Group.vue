<template>
  <div class="mcp group clearfix">
    <a v-on:click="changeAudioStatus" v-bind:class="['btn', isStart ? 'pause' : 'start']"></a>
    <a v-on:click="switchSong(songKey - 1)" class="btn prev"></a>
    <a v-on:click="switchSong(songKey + 1)" class="btn next"></a>
    <a v-on:click="switchBtn" v-bind:class="['btn-switch', playerModel[modelKey].className]"></a>
  </div>
</template>

<script>
import audioCtrlApi from '../vuex/actions.js';
import audioDataApi from '../vuex/getters.js';
export default {
  data () {
    return {
      isReady: false,

    };
  },
  vuex: {
    actions: {
      changeAudioStatus: audioCtrlApi.editStatus,
      stopAudio: audioCtrlApi.stop,
      updateSongKey: audioCtrlApi.updateSongKey,
      updateModelKey: audioCtrlApi.updateModelKey,
    },
    getters: {
      isStart: audioDataApi.getAudioStatus,
      songKey: audioDataApi.getSongKey,
      songInfo: audioDataApi.getSongInfo,
      modelKey: audioDataApi.getPlayerModelKey,
      playerModel: audioDataApi.getPlayerModel,
    }
  },
  methods: {
    sendAjax () {
      fetch('https://www.baidu.com')
      .then((response) => response.json())
      .then((response) => {
        console.log(response.result.hitokoto);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    switchBtn () {
      let modelKey = this.modelKey;
      modelKey >= 2 ? modelKey = 0 : modelKey++;
      this.updateModelKey(modelKey);
    },
    switchSong (songKey) {
      this.stopAudio();
      const songNumber = this.songInfo.length - 1;
      if (this.playerModel[this.modelKey].className == 'shuffle') {
        songKey =  Math.floor(Math.random() * this.songInfo.length);
        songKey == this.songKey ? songKey++ : false;
      }
      if (songKey < 0) {
        songKey = songNumber;
      }
      if (songKey > songNumber) {
        songKey = 0;
      }
      this.updateSongKey(songKey);
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  margin: 5px;
  background-color: #fff;
}
.group .btn {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background-color: #fff;
  background-size: 50px 50px;
  margin-right: 8px;
  float: left;
  cursor: pointer;
}
.group .btn-switch {
  background-image: url('../assets/img/player.png');
  background-size: 540px;
  border-radius: 3px;
  width: 35px;
  height: 30px;
  border-radius: 6px;
  background-color: #fff;
  margin-right: 8px;
  float: left;
  cursor: pointer;
}
.group .start {
  background-image: url('../assets/img/start.png');
}
.group .pause {
  background-image: url('../assets/img/pause.png');
}
.group .prev {
  background-image: url('../assets/img/prev.png');
}
.group .next {
  background-image: url('../assets/img/next.png');
}
.group .order-repeat {
  background-position: 287px -7px;
}
.group .shuffle {
  background-position: 287px -48px;
}
.group .once-repeat {
  background-position: 329px -130px;
}
</style>
