<template>
  <div id="app">
    <Header/>
    <div id="all-content-wrapper">
      <div id="left-wrapper">
      <Login/>
      </div>
      <div id="right-wrapper">
        <FilterBox/>
        <template v-for="(content,index) in contentList.data" >
        <Content :key="'content'+content.id"  :content="content"/>
          <template v-if="(index + 1) % 3 === 0" >
            <Sponsor :key="'ad'+index" :ad="adsList.data[parseInt(index/3)]"/>
          </template>
        </template>
      </div>
    </div>
   
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from './components/Header'
import Login from './components/Login'
import FilterBox from './components/FilterBox'
import Content from './components/Content'
import Sponsor from './components/Sponsor'

export default {
  name: 'App',
  components: {
    Header,
    Login,
    FilterBox,
    Content,
    Sponsor
  },
  mounted(){
    this.listInitial()
    this.adsInital()
  },
  computed: {
      ...mapGetters({
        contentList: 'contentList',
        category: 'category',
        adsList: 'adsList'
      })
  },
  methods: {
    ...mapActions({
      getContentList: 'getContentList',
      getCategory: 'getCategory',
      getAdsList: 'getAdsList'
    }),
    listInitial(){
      const params = {
          page  : 1,
          ord : 'asc',
          category : [1,2,3],
          limit : 10,
      }
      this.getContentList(params)
    },
    adsInital(){
      const params = {
          page  : 1,
          limit : 3,
      }
      this.getAdsList(params)
    }
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
  
  #all-content-wrapper { 
   width: 60%;
   margin: 0 auto;
   display: flex;

    @media only screen and (max-width: 768px) {
      width: 100%;
      margin: 0;
    }

    #right-wrapper {
      width: calc(100% - 275px);

      @media only screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
}

</style>
