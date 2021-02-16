<template>
  <div id="header-container">
      <p class="header-text">[2021년02월00일] 김수경</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#header-container {
    width: 100%;
    height: 70px;
    line-height: 70px;
    position: fixed;
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
        }
    }
}

</style>