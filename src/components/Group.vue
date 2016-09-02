<template>
  <div class="mcp group clearfix">
    <a v-on:click="changeAudioStatus" v-bind:class="['btn', isStart ? 'pause' : 'start']"></a>
    <a class="btn prev"></a>
    <a class="btn next"></a>
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
      modelKey: 0,
      playerModel: [
        { className:'shuffle',callback: () => { console.log('xx') } },
        { className:'order-repeat' },
        { className:'once-repeat' }
      ]
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
    switchBtn () {
      this.modelKey >= 2 ? this.modelKey = 0 : this.modelKey++;
    }
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
