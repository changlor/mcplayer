//action 会收到 store 作为它的第一个参数
//既然我们只对事件的分发(dispatch 对象)感兴趣。（state 也可以作为可选项放入）
//我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
export const incrementCounter = function ({ dispatch }) {
    dispatch('INCREMENT', 1)
}
export const editAudioStatus = function ({ dispatch }) {
    dispatch('AUDIO_STATUS')
}
export const fetchSongInfo = function ({ dispatch, info }) {
    dispatch('BODY_INFO', info)
}
export const updateAudioProgress = function ({ dispatch }, audioProgress) {
    dispatch('AUDIO_CURRENT_TIME', audioProgress)
}