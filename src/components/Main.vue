<template>
  <div id="main">
    <div id="all-content-wrapper">
      <div id="left-wrapper">
        <Login/>
      </div>
      <div id="right-wrapper">
          <FilterBox @changeOrd="listOrd" @openFilterModal="isFiltered=true"/>
          <template v-for="(content, index) in allContentList">
            <Content v-if="content.type === 'content'" :key="'content'+index" :content="content" :category="category" @click.native="goDetail(content.id)"/>
            <Sponsor v-if="content.type === 'sponsor'" :key="'ad'+index" :ad="content"/>
          </template>
      </div>
    </div>
    <!-- 모달 팝업 창 -->
    <FilterModal v-show="isFiltered" :categoryList="category" @saveClose="listFilter" @close="isFiltered = false"/>
    <Loading :loading="loading"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Login from './Login'
import FilterBox from './FilterBox'
import Content from './Content'
import Sponsor from './Sponsor'
import FilterModal from './FilterModal'
import Loading from './Loading'

export default {
  name: 'Main',
  components: {
    Login,
    FilterBox,
    Content,
    Sponsor,
    FilterModal,
    Loading
  },
  data(){
    return {
      isFiltered: false,
    }
  },
  mounted(){
   this.getCategoryList()

    //infiniteLoading 
    this.$nextTick(()=>{
        window.addEventListener('scroll',this.scrollBottom);
    })
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.scrollBottom);
  },
  computed: {
      ...mapGetters({
        contentList: 'contentList',
        loading:'loading',
        adsList: 'adsList',
        allContentList: 'allContentList',
        category: 'category',
        selectedCategory:'selectedCategory',
        order:'order',
        nextPage: 'nextPage'
      })
  },
   watch:{
     category(){
       this.loadContent()
     },
     selectedCategory(){
       this.loadContent()
     },
     order(){
        this.loadContent()
     },
  },
  methods: {
    ...mapActions({
      getCategoryList: 'getCategoryList',
      getContentList: 'getContentList',
      getAdsList: 'getAdsList'
    }),
    ...mapMutations({
      initList: 'initList',
      setAllContentList:'setAllContentList',
      setOrder: 'setOrder',
      setSelectedCategory : 'setSelectedCategory'
    }),
    scrollBottom(){
      let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        if(bottomOfWindow) {
          this.loadContent()
        }
    },
    loadContent(){
      this.getContentList()
      this.getAdsList()
      setTimeout(() => {
        if(this.contentList.length > parseInt(this.contentList.length/3) * 3){
          this.setAllContentList()
       }else{
          this.getAdsList()
          setTimeout(() => {
            this.setAllContentList()
          }, 1000)
       }
      }, 1000)
    },
    listOrd(ord){
      this.initList()
      this.setOrder(ord)
    },
    listFilter(checkedCategory){
      this.isFiltered = false
      this.initList()
      this.setSelectedCategory(checkedCategory)
    },
    goDetail(id){
      this.$router.push({ name: 'Detail', params: { id: id }})
    },
  },
}
</script>

<style lang="scss" scoped>
#main {
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
