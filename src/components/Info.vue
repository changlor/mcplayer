<template>
  <div class="mcp info clearfix">
    <a class="mask"></a>
    <a class="song-name">{{ songInfo.songName }}</a>
    <a class="artist-name">{{ songInfo.artistName }}</a>
    <div class="pro-g">
      <div class="pro-g-bar" role="progressbar" aria-valuenow="600" aria-valuemin="0" aria-valuemax="100" v-bind:style="{ width: audioProgress.completionRate + '%' }"></div>
    </div>
  </div>
</template>

<script>
import audioDataApi from '../vuex/getters.js'
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  vuex: {
    getters: {
      //注意这里你需要 'getCount' 函数本身而不是它的执行结果 'getCount()'
      audioStatus: audioDataApi.getAudioStatus,
      songInfo: audioDataApi.getSongInfo,
      audioProgress: audioDataApi.getAudioProgress
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info .song-name {
  color: #888;
}
.info .artist-name {
  color: #ccc;
}
.mcp .mask {
  width: 60px;
  height: 60px;
  margin-right: 9px;
  border-radius: 6px;
  background-color: #eee;
  background-image: url('../assets/mask.png');
  background-size: 60px 60px;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.185);
  float: left;
}
.pro-g {
  background-color: rgb(245, 245, 245);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 2px 0px inset;
  color: rgb(51, 51, 51);
  font-size: 14px;
  height: 8px;
  margin-top: 15px;
  margin-left: 70px;
  margin-bottom: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 300px;
}
.pro-g-bar {
  background-color: rgba(238, 110, 115, 1);
  box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  display: block;
  float: left;
  height: 8px;
  line-height: 20px;
  transition-delay: 0s;
  transition-duration: 0.6s;
  transition-property: width;
  transition-timing-function: ease;
  width: 489.297px;
}
</style>
