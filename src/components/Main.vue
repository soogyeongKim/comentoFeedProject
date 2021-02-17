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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Login from './Login'
import FilterBox from './FilterBox'
import Content from './Content'
import Sponsor from './Sponsor'
import FilterModal from './FilterModal'

export default {
  name: 'Main',
  components: {
    Login,
    FilterBox,
    Content,
    Sponsor,
    FilterModal
  },
  data(){
    return {
      loading : true,
      isFiltered: false,
    }
  },
  mounted(){
   this.getCategoryList()

    //infiniteLoading 
    window.addEventListener('scroll', () => {
      if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        this.loadContent()
      }
    });
  },
  computed: {
      ...mapGetters({
        contentList: 'contentList',
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
    loadContent(){
      this.getContentList()
      this.getAdsList()
      setTimeout(() => {
        if(this.contentList.length > parseInt(this.contentList.length/3) * 3){
          this.setAllContentList()
          this.loading = false;
       }else{
          this.getAdsList()
          setTimeout(() => {
            this.setAllContentList()
            this.loading = false;
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
