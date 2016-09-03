import Vue from 'vue';
import Vuex from 'vuex';

//告诉 vue "使用" vuex
Vue.use(Vuex);

//创建一个对象来保存应用启动时的初始状态
const state = {
    //应用启动时，count 置为0
    songKey: 0,
    songPlayList: [
        {
            url: 'http://m2.music.126.net/v6539YJHJVUsDdqm9UhBmw==/6037418348311744.mp3',
            songName: '不如跳舞',
            artistName: '陈慧琳',
        },
        {
            url: 'http://m2.music.126.net/t24d6GoZRkqxzFAovlZEQw==/6027522743661760.mp3',
            songName: '演员',
            artistName: '薛之谦'
        },
        {
            url: 'http://m2.music.126.net/IBtGswu67ExcDXZ3W3He_Q==/5973646674312042.mp3',
            songName: '傻孩子',
            artistName: '小金',
        }
    ],
    audioStatus: false,
    audioProgress: {
        currentTime: 0,
        length: 0,
        completionRate: 0,
        bufferedRate: 0,
    },
    body: [
        {
            url: 'http://m2.music.126.net/v6539YJHJVUsDdqm9UhBmw==/6037418348311744.mp3',
            songName: '不如跳舞',
            artistName: '陈慧琳',
        },
        {
            url: 'http://m2.music.126.net/t24d6GoZRkqxzFAovlZEQw==/6027522743661760.mp3',
            songName: '演员',
            artistName: '薛之谦'
        },
        {
            url: 'http://m2.music.126.net/IBtGswu67ExcDXZ3W3He_Q==/5973646674312042.mp3',
            songName: '傻孩子',
            artistName: '小金',
        }
    ],
    modelKey: 0,
    playerModel: [
        { className:'order-repeat' },
        { className:'shuffle' },
        { className:'once-repeat' },
    ],
};

//创建一个对象储存一系列我们解析来要写的 mutation 函数

const mutations = {
    //mutation 的第一个参数是当前的 state
    //你可以在函数里修改 state
    SONG_KEY (state, nextKey) {
        state.songKey = nextKey;
    },
    MODEL_KEY (state, nextKey) {
        state.modelKey = nextKey;
    },
    AUDIO_STATUS (state) {
        state.audioStatus = !state.audioStatus;
    },
    BODY_INFO (state, info) {
        //state.body.url = info.url
        //state.body.songName = info.songName
        //state.body.artistName = info.artistName
    },
    STOP (state) {
        state.audioStatus = false;
    },
    PLAY (state) {
        state.audioStatus = true;
    },
};

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
