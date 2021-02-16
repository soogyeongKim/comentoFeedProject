<template>
  <div id="main">
    <div id="all-content-wrapper">
      <div id="left-wrapper">
        <Login/>
      </div>
      <div id="right-wrapper">
          <FilterBox @changeOrd="listOrd" @openFilterModal="isFiltered=true"/>
          <template v-for="(content,index) in contentList.data" >
            <Content :key="'content'+content.id" :content="content" :category="categoryList" @click.native="goDetail(content.id)"/>
            <template v-if="(index + 1) % 3 === 0" >
                <Sponsor :key="'ad'+index" :ad="adsList.data[parseInt(index/3)]"/>
            </template>
          </template>
      </div>
    </div>

            <!-- 모달 팝업 창 -->
    <FilterModal v-show="isFiltered" :categoryList="categoryList" @saveClose="listFilter" @close="isFiltered = false"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    return{
      isFiltered : false,
      allCategory : [],
      checkedCategory : []
    }
  },
  mounted(){
    this.getCategoryList()
    this.adsInital()
  },
  computed: {
      ...mapGetters({
        contentList: 'contentList',
        categoryList: 'categoryList',
        adsList: 'adsList'
      })
  },
   watch:{
     categoryList(category){
       this.allCategory = category.map((c)=>c.id)
       this.listInitial(null, this.allCategory)
     }
  },
  methods: {
    ...mapActions({
      getContentList: 'getContentList',
      getCategoryList: 'getCategoryList',
      getAdsList: 'getAdsList'
    }),
    listInitial(ord, selectedCategory){
      const orderList = ord ? ord : 'asc'
      const params = {
          page  : 1,
          ord : orderList,
          category : selectedCategory,
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
    },
    listOrd(ord){
      if(ord){
        this.listInitial(ord, this.checkedCategory && this.checkedCategory.length !== 0 ? this.checkedCategory : this.allCategory)
      }
    },
    listFilter(checkedCategory){
      this.isFiltered = false
      this.checkedCategory = checkedCategory
      this.listInitial(null,checkedCategory)
    },
    goDetail(id){
      this.$router.push({ name: 'Detail', params: { id: id }})
    }
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
