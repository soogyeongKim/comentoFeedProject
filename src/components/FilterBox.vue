<template>
  <div id="filter-container">
    <ul class="filter-label"> 
      <li 
        v-for="(filter, index) in filters" 
        :key="index" 
        :class="{active : filter === selectedFilter}" 
        @click="changeFilter(filter)">
        {{ filter === 'asc' ?  '오름차순' : '내림차순'}}
      </li>
    </ul>
    <button class="filter-btn" @click="selecteCategory">필터</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      filters:['asc','desc'],
      selectedFilter :''
    }
  },
  created() {
    this.selectedFilter = this.order
  },
  computed: {
    ...mapGetters({
      order:'order',
    })
  },
  methods: {
    changeFilter(filter){
      this.selectedFilter = filter
      this.$emit('changeOrd', this.selectedFilter);
    },
    selecteCategory(){
      this.$emit('openFilterModal');
    }
  }
}
</script>

<style lang="scss" scoped>
#filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.813rem;
  margin-bottom: 11px;
  background-color: #fff;

  @media only screen and (max-width: 768px) {
    margin: 0;
    padding: 11px 15px;
    border-bottom: $border;
  }

  .filter-label {
    list-style: none;

    li {
    float:left;
    color: #adb5bd;
    margin-right: 13px;
    cursor: pointer;
    }

    li::before {
      content: "\2022"; 
      font-size: x-large;
      vertical-align: middle;
      color: #e1e4e7; 
      display: inline-block; 
    }

    .active {
      color: $sub-font-color;

      &:before {
        color: $comento-green; 
      }
    }
  }

  .filter-btn {
    width: 48px;
    height: 24px;
    text-align: center;
    border-radius: 3px;
    border: solid 1px #e1e4e7;
    background-color: #ffffff;
    color: #adb5bd;
  }
    
}
</style>