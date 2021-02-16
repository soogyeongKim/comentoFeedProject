<template>
<div id="sponsor">
    <p class="sponsor-label">sponsored</p>
    <div class="sponsor-container">
        <img :src="`https://cdn.comento.kr/assignment/${ad.img}`" />
        <div class="sponsor-data">
            <p class="sponsor-title">
                {{ ad.title }}
            </p>
            <p class="sponsor-content">
                {{ ad.contents }}
            </p>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    props: {
        ad: {
        type: Object,
        },
    },
}
</script>

<style lang="scss" scoped>
#sponsor {
    border-radius: 5px;
    padding: 25px 30px 21px;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    border: $border;
    background-color: #ffffff;
    margin-bottom: 30px;

    @media only screen and (max-width: 768px) {
      border: none;
      padding: 20px 15px;
    }
    
    .sponsor-label {
        font-size: 0.813rem;
        color:  #adb5bd;
        margin-bottom: 15px;
    }

    .sponsor-container {
        display: flex;

        @media only screen and (max-width: 768px) {
            flex-direction: column;
        }

        img {
            width: 310px;
            height: 179px;
            object-fit: cover;

            @media only screen and (max-width: 768px) {
                width: 100%;
                margin-bottom: 15.5px;
            }
        }

        .sponsor-data {
            flex: 1;
            padding-left: 30px;

            @media only screen and (max-width: 768px) {
                padding-left: 0;
            }

            .sponsor-title {
                @include Title;
                 overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical; 
            }

            .sponsor-content {
                @include Contents;
                 overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical; 
            }
        }
    }
}
</style>