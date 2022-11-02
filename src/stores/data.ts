import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getApiList } from '@/server';
import type {RootObject,ChinaDaily,chinaDailyAdd} from './type'
export const useStore = defineStore('counter', {
  state: () => {
    return {
      list:<any>{},
      item:<RootObject>{},
      chinaDaily:<ChinaDaily>{},
      chinaDailyAdd:<chinaDailyAdd>{},
    }
  },
  getters: {

  },
  actions: {
    async getList(){      
      const result = await getApiList()
      this.list = result
      // this.chinaDaily = this.list.chinaDaily
      // this.chinaDailyAdd = this.list.chinaDailyAdd
    }
  }

})
