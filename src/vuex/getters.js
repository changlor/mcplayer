//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class audioDataApi {
    static getSongKey = state => state.songKey;
    static getAudioStatus = state => state.audioStatus;
    static getSongInfo = state => state.body;
    static getAudioProgress = state => state.audioProgress;
    static getPlayerModelKey = state => state.modelKey;
    static getPlayerModel = state => state.playerModel;
};

export default audioDataApi;