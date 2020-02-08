<template>
  <div>
    <h1 class="title">오늘의 적발</h1>
    <div>{{ $route.path }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface INews {
  title: string
  originallink: string
  link: string
  description: string
  pubDate: Date
}

interface IData {
  lastBuildDate: Date
  total: number
  start: number
  display: number
  items: INews[]
}

export default Vue.extend({
  name: 'VueIndexPage',
  async asyncData({ app, env }) {
    try {
      const payload = await app.$axios({
        url: 'https://openapi.naver.com/v1/search/news.json',
        params: { query: '적발', sort: 'date', display: 100 },
        headers: {
          'X-Naver-Client-Id': env.CLIENT_ID,
          'X-Naver-Client-Secret': env.CLIENT_SECRET
        }
      })
      const data: IData = payload.data
      const news = data.items.filter(
        item =>
          item.title.indexOf('적발') > -1 &&
          app
            .$moment(
              app
                .$moment()
                .add(-1, 'days')
                .format('YYYY-MM-DD')
            )
            .isSame(app.$moment(item.pubDate).format('YYYY-MM-DD'))
      )
      console.log(news)
      return { news }
    } catch (err) {
      console.log(err)
    }
  },
  data: () => ({
    news: []
  })
})
</script>

<style lang="scss" scoped>
.title {
  padding-top: 4rem;
}
</style>  
