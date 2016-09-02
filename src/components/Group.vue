<template>
  <div class="mcp group clearfix">
    <a v-on:click="changeAudioStatus" v-bind:class="['btn', isStart ? 'pause' : 'start']"></a>
    <a class="btn prev"></a>
    <a class="btn next"></a>
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
    },
    getters: {
      isStart: audioDataApi.getAudioStatus,
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
</style>
