<template>
  <div id="app">
    <div class="mcplayer clearfix">
      <div class="mcp list"></div>
      <Info></Info>
      <Group></Group>
      <Audio></Audio>
    </div>
  </div>
</template>

<script>
import Info from './components/Info.vue';
import Group from './components/Group.vue';
import Audio from './components/Audio.vue';
import store from './vuex/store.js';

export default {
  data () {
    return {
      isStart: false,
    };
  },
  components: {
    Info,
    Group,
    Audio
  },
  store,
};
</script>

<style>
html {
  height: 100%;
}
.clearfix:after{
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.mcp {
  float: left;
}
.mcplayer {
  width: 400px;
  padding: 9px;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
}
</style>
