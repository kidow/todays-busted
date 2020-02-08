import { Plugin } from '@nuxt/types'
import * as moment from 'moment'
import { Moment } from 'moment'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: Moment
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $moment: Moment
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $moment: Moment
  }
}

const MomentPlugin: Plugin = (context, inject) => {
  inject('moment', moment)
}

export default MomentPlugin
