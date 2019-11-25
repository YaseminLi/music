import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger'; //mutation修改时控制台打印修改日志

Vue.use(Vuex);

const debug=process.env.NODE_ENV!=='production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,//检测修改是否通过mutation，只在线下开启，性能消耗大
    plugins:debug?[createLogger()]:[]
})