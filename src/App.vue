<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  padding-top: 120px;
  overflow-x: hidden;

  @media only screen and (max-width: 768px) {
    padding-top: 45px;
    background-color: #f4f5f7;;
  }
}

</style>
