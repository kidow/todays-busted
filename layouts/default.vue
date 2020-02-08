<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style lang="scss">
.container {
  max-width: 960px;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 0 16px;
  }
}
</style>