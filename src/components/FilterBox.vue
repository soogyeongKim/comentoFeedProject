<template>
  <div id="filter-container">
        <ul class="filter-label"> 
          <li>오름차순</li>
          <li>내림차순</li>
        </ul>
        <button class="filter-btn">필터</button>
  </div>
</template>

<script>
export default {

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
        color: $sub-font-color;
        margin-right: 13px;
        }

        li::before {
            content: "\2022"; 
            color: $comento-green; 
            display: inline-block; 
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