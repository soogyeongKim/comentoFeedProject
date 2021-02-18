<template>
  <div id="login-container">
    <button class="login-btn">로그인</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#login-container {
    margin-right: 40px;

    .login-btn {
      width: 235px;
      height: 60px;
      border-radius: 5px;
      background-color: $comento-green;
      color:white;
      text-align: center;
    }

    @media only screen and (max-width: 768px) {
      display: none;
    }
}
</style>