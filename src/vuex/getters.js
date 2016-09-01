//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count

export function getCount (state) {
    return state.count
}

export function getAudioStatus (state) {
    return state.audioStatus
}

export function getSongInfo (state) {
    return state.body
}

export function getAudioProgress (state) {
    return state.audioProgress
}