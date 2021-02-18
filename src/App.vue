<template>
  <div id="app">
    <Header/>
    <div v-if="isIE" class="IEcheck">
      <div class="IEtext">
        이 서비스는 Chrome 브라우저에 최적화 되어있습니다.<br />
        Internet Explorer(IE) 에서는 일부 기능에 제한이 있을 수 있습니다.<br />
        그래도 계속 사용하시겠습니까?<br />
      </div>
      <div class="IEbtn"> 
          <button @click="goChromePage">아니요<br />Chrome 으로 진행하겠습니다</button>
          <button @click="useIE">네<br />Internet Explorer(IE)로 진행할게요</button>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
  data(){
    return {
      isIE: false,
    }
  },
  mounted() {
    const agent = navigator.userAgent.toLowerCase()
    this.isIE =
      (navigator.appName === 'Netscape' && agent.includes('trident')) ||
      agent.includes('msie')
  },
  methods: {
    useIE() {
      this.isIE = false
    },
    goChromePage() {
      window.open('https://www.google.com/intl/ko/chrome/', '_blank')
    },
  }
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

  .IEcheck {
    width: 100vw;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .IEbtn {
      width: 580px;
      margin-top: 16px;
      display: flex;
      justify-content: space-around;
      
      button {
        width: 260px;
        justify-content: space-around;
        height: 60px;
        border-radius: 5px;
        background-color: #adb5bd;
        color:#fff;
        text-align: center;
      }

      button:first-child{
          background-color: $comento-green;
          color:#fff;
      }
    }
  }
}

</style>
