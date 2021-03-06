//action 会收到 store 作为它的第一个参数
//既然我们只对事件的分发(dispatch 对象)感兴趣。（state 也可以作为可选项放入）
//我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
class audioCtrlApi {
  static updateSongKey ({ dispatch }, songKey ) {
    dispatch('SONG_KEY', songKey);
  }
  static updateModelKey ({ dispatch }, modelKey ) {
    dispatch('MODEL_KEY', modelKey);
  }
  static editStatus ({ dispatch }) {
    dispatch('AUDIO_STATUS');
  }
  static endedAudioPlayStatus ({ dispatch }) {
    dispatch('AUDIO_ENDED_STATUS', true);
  }
  static startAudioPlayStatus ({ dispatch }) {
    dispatch('AUDIO_ENDED_STATUS', false);
  }
  static fetchSongInfo ({ dispatch, info }) {
    dispatch('BODY_INFO', info);
  }
  static stop ({ dispatch }) {
    dispatch('STOP');
  }
  static play ({ dispatch }) {
    dispatch('PLAY');
  }
};

export default audioCtrlApi;