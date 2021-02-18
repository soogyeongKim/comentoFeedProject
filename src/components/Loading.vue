<template>
  <div id="loading-mask" v-if="loading">
      <div class="loading-wrapper">
            <div class="loading-mask-progress rotation">
                <div></div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
#loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9989;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity .3s ease;

    .loading-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        backface-visibility: hidden;

        .loading-mask-progress.rotation > div {
            width: 60px;
            height: 60px;
            margin: auto;
            border-radius: 100%;
            border-color: $comento-green;
            border-width: 6px;
            border-style: solid;
            border-left-color: transparent !important;
            border-right-color: transparent !important;
            border-bottom-color: transparent !important;
            animation: loading-progress-rotation 1s infinite linear; }

            @keyframes loading-progress-rotation {
            0% {
                transform: rotate(0deg); }
            100% {
                transform: rotate(360deg); } }
    }
}

</style>