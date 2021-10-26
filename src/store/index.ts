import Vue from 'vue';
import Vuex from 'vuex';
import {productStore} from "@/store/product";

Vue.use(Vuex);

export const store = new Vuex.Store(productStore);
