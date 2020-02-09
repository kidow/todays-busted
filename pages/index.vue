<template>
  <div>
    <h1 class="title">오늘의 적발</h1>
    <div class="news-container" v-if="news.length">
      <div class="news-item" v-for="(item,i) in news" :key="i">
        <a :href="item.link" target="_blank" v-html="item.title" class="item-title" />
        <p class="item-description">{{ item.description }}</p>
        <el-divider />
      </div>
      <div class="info">
        <i class="el-icon-info"></i> 위 기사들은 네이버 뉴스 API를 참고하였습니다.
      </div>
    </div>
    <div v-else style="font-size: 24px">와! 오늘은 아무런 적발이 없네요!</div>
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

interface IIndex {
  news: INews[]
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
          item.title.indexOf('<b>적발</b>시') === -1 &&
          item.title.indexOf('<b>적발</b> 시') === -1 &&
          item.title.indexOf('<b>적발</b>땐') === -1 &&
          item.title.indexOf('<b>적발</b> 땐') === -1 &&
          item.title.indexOf('지난해') === -1 &&
          app
            .$moment(
              app
                .$moment()
                .format('YYYY-MM-DD')
            )
            .isSame(app.$moment(item.pubDate).format('YYYY-MM-DD'))
      )
      return { news }
    } catch (err) {
      console.log(err)
    }
  },
  data(): IIndex {
    return {
      news: []
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  padding: 4rem 0 2rem;
}
.dates {
  display: flex;
  align-items: center;
  justify-content: center;
}
.news-container {
  border: 1px solid $oc-gray-3;
  border-radius: 4px;
  padding: 16px;
  background: #fff;
  text-align: left;
}
.news-item {
  .item-title {
    font-size: 24px;
    font-weight: 500;
    color: #0000cc;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>  
