<template>
  <div>
    <h1 class="title">오늘의 적발</h1>
    <div class="dates">
      <el-button icon="el-icon-caret-left" @click="() =>  addDays(-1)" />
      <el-date-picker type="date" v-model="date" :clearable="false"></el-date-picker>
      <el-button icon="el-icon-caret-right" @click="() =>  addDays(1)" />
    </div>
    <div class="news-container" v-loading="loading">
      <div class="news-item" v-for="(item,i) in news" :key="i">
        <a :href="item.link" target="_blank" v-html="item.title" />
        asd
      </div>
    </div>
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
  date: string
  loading: boolean
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
          app
            .$moment(app.$moment().format('YYYY-MM-DD'))
            .isSame(app.$moment(item.pubDate).format('YYYY-MM-DD'))
      )
      console.log(news)
      return { news }
    } catch (err) {
      console.log(err)
    }
  },
  data(): IIndex {
    return {
      news: [],
      date: this.$moment().format('YYYY-MM-DD'),
      loading: false
    }
  },
  methods: {
    addDays(day: number): void {
      this.date = this.$moment(this.date)
        .add(day, 'days')
        .format('YYYY-MM-DD')
    },
    async getNews() {
      this.loading = true
      try {
        const payload = await this.$axios({
          url: 'https://openapi.naver.com/v1/search/news.json',
          params: { query: '적발', sort: 'date', display: 100 },
          headers: {
            'X-Naver-Client-Id': 'Mkq7Eru2JSVi98sj7rc5',
            'X-Naver-Client-Secret': 'XovErnZzkH'
          }
        })
        const data: IData = payload.data
        const news = data.items.filter(
          item =>
            item.title.indexOf('적발') > -1 &&
            item.title.indexOf('<b>적발</b>시') === -1 &&
            this.$moment(this.$moment().format('YYYY-MM-DD')).isSame(
              this.$moment(item.pubDate).format('YYYY-MM-DD')
            )
        )
        this.news = news
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    date() {
      this.getNews()
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  padding-top: 4rem;
}
.dates {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>  
