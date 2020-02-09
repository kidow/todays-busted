<template>
  <div class="container">
    <nuxt />
    <div class="github-button" @click="onOpen">
      <i class="fab fa-github"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onOpen() {
      window.open('https://github.com/kidow/todays-busted', '_blank')
    }
  }
}
</script>

<style lang="scss">
.container {
  max-width: 720px;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  @media screen and (max-width: 720px) {
    width: 100%;
    padding: 0 16px 2rem;
  }
  padding-bottom: 4rem;
}
.github-button {
  position: absolute;
  top: 20px;
  right: 20px;
  .fa-github {
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
    &:active {
      filter: brightness(1.1);
    }
    width: 2rem;
    height: 2rem;
    @media screen and (max-width: 720px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>