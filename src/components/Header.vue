<template>
  <div id="header-container">
      <button v-if="this.$route.params.id && isMobile" class="header-btn" @click="back">  &#60; </button>
      <p v-else class="header-text">[2021년02월00일] 김수경</p>
  </div>
</template>

<script>
export default {
     data(){
        return {
            isMobile: false
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.onResize()
        })
        window.addEventListener('resize', this.onResize);
    },
    destroyed(){
        window.removeEventListener('resize', this.onResize);
    },
    methods :{
        onResize(){
            const width = document.body.clientWidth;
            if(width <= 768){
                console.log("mobile")
                this.isMobile = true
            }else {
                this.isMobile = false
            }
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
#header-container {
    width: 100%;
    height: 70px;
    line-height: 70px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.07);
    background-color: #ffffff;

    @media only screen and (max-width: 768px) {
        height: 45px;
    }

    .header-text {
        width: 60%;
        margin: 0 auto;
        color: #212529;

        @media only screen and (max-width: 768px) {
            margin: 0 15px;
            line-height: 45px;
        }
    }

    .header-btn {
        margin: 0 15px;
        font-size: 22px;
        line-height: 45px;
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>