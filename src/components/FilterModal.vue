<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <button class="modal-close" @click="$emit('close')">&#215;</button>
            <div class="modal-body">
            <p>필터</p>
            <div class="modal-checkbox" v-for="(category,index) in categoryList" :key="'category'+index" id="category.id">
                <input type="checkbox" checked=true :id="category.id" :value="category" v-model="checkedCategory" >
                <label :for="category.id">{{category.name}}</label>
            </div>
            </div>

            <div class="modal-footer">
                <button class="modal-default-button" @click="$emit('saveClose',checkedCategory)">
                    저장하기
                </button>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
      categoryList: {
          type: Array,
      },
    },
    data(){
      return{
        checkedCategory:[]
      }
    },
    computed : {
      ...mapGetters({
        selectedCategory:'selectedCategory',
      })
    },
    watch : {
      selectedCategory(selected){
        this.checkedCategory = selected
      }
    },
    mounted () {
      this.checkedCategory = this.selectedCategory
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  height: 208px;
  margin: 0px auto;
  padding: 30px;
  background-color: #fff;
  transition: all .3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media only screen and (max-width: 768px) {
      width: 277px;
    }

  .modal-close {
      position: absolute;
      top:15px;
      right: 15px;
      color: #adb5bd;
  }
}

.modal-body p {
  margin-top: 0;
  font-size: 1.375rem;
  line-height: 1.45;
  font-weight: bold;
  color: #212529;
}

.modal-body {
  .modal-checkbox {
    margin: 10px 0;
    font-size: 1rem;
    line-height: 2;
    color: $sub-font-color;

    input[type="checkbox"] { 
        //체크박스 초기화
        display: none;
    }

    input[type="checkbox"] + label {
        display: inline-block; 
        position: relative; 
        cursor: pointer; 
        -webkit-user-select: none; 
        -moz-user-select: none; 
        -ms-user-select: none; 
    }

    input[type="checkbox"] + label:before { 
        //체크박스 커스텀
        content: ' '; 
        display: inline-block; 
        width: 20px;
        height: 20px; 
        line-height: 20px; 
        margin-right: 5px; 
        text-align: center; 
        vertical-align: middle; 
        background: #fff; 
        border: $border; 
    }

    input[type="checkbox"]:checked + label:before { 
        content: '\25A0';
        font-size: 5px;
        color: $comento-green; 
        border: 1px solid $comento-green;
        }
  }
}

.modal-footer {
    height: 40px;
    position: relative;
    bottom: 0;
}

.modal-default-button {
  float: right;
  width: 99px;
  height: 40px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  background-color: #00c854;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
