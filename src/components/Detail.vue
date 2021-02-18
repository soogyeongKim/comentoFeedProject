<template>
  <div id="detail">
      <div class="detail-box">
          <p class="detail-title">{{ detail.title }}</p>
          <p class="detail-contents">{{ detail.contents }}</p>
          <p class="detail-date">created_at({{ dateFormat(detail.created_at) }})</p>
      </div>
      <p class="reply-label">답변 <span v-if="detail.reply && detail.reply.length > 1">{{ detail.reply.length }}</span></p>
      <div class="reply-box" v-for="(reply, index) in detail.reply" :key="'reply'+index">
        <p class="reply-username">{{ reply.user.name }}</p>
        <p class="reply-contents">{{ reply.contents }}</p>
        <p class="reply-date">created_at({{ dateFormat(reply.created_at) }})</p>
      </div>
      <Loading :loading="detailLoading"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loading from './Loading'
export default {
    name: "Detail",
    components: {
        Loading
    },
    mounted(){
        this.$nextTick(()=>{
            this.getDetail({id : this.$route.params.id})
        })
    },
    beforeDestroy(){
        this.setDetail({})
    },
    computed: {
        ...mapGetters({
            detail: 'detail',
            detailLoading:'detailLoading'
        })
    },
    methods: {
        ...mapActions({
            getDetail: 'getDetail',
        }),
        ...mapMutations({
            setDetail:'setDetail'
        }),
        dateFormat(createdDate){
            let date = new Date(createdDate);
            let string =
                this.addZeros(date.getFullYear(), 4) + '-' +
                this.addZeros(date.getMonth() + 1, 2) + '-' +
                this.addZeros(date.getDate(), 2) ;
           return string;
        },
        addZeros(n, digits) {
            var zero = '';
            n = n.toString();

            if (n.length < digits) {
                for (let i = 0; i < digits - n.length; i++)
                zero += '0';
            }
            return zero + n;
        }
    }
}
</script>

<style lang="scss" scoped>
#detail{
    width: 60%;
    margin: 0 auto;

    @media only screen and (max-width: 768px) {
        background-color: #fff;
        width: calc(100% - 30px);
        padding: 20px 15px;
    }

    .detail-box {
        border: 1px solid $comento-green;
        border-radius: 5px;
        padding: 20px 93px 20px 30px;
        margin-bottom: 30px;

        @media only screen and (max-width: 768px) {
            border: 0;
            border-radius: 0;
            border-top: 1px solid $comento-green;
            border-bottom: 1px solid $comento-green;
            padding: 20px 0;
        }

        .detail-title  {
            @include Title;
        }

        .detail-contents {
            @include Contents;
            margin-bottom: 21px;
        }

        .detail-date {
            color: #adb5bd;
            font-size: 0.813rem;
        }
    }

    .reply-label {
        font-size: 1rem;
        line-height: 1.56;
        color: $sub-font-color;
        margin-bottom: 10px;

        span {
            padding-left: 9px;
            color: $comento-green;
        }
    }

    .reply-box {
        border : $border;
        border-radius: 5px;
        padding: 20px 30px;
        font-size: 1rem;
        margin-bottom: 30px;

        @media only screen and (max-width: 768px) {
            border: 0;
            border-radius: 0;
            border-top: 1px solid #e1e4e7;
            border-bottom: 1px solid #e1e4e7;
            padding: 20px 0;
        }
        
        .reply-username {
            color: #7e848a;
            padding-bottom: 11px;
            margin-bottom: 23px;
            border-bottom: $border;
        }

        .reply-contents {
            color: $sub-font-color;
            margin-bottom: 15px;
        }

        .reply-date {
            color: #adb5bd;
            font-size: 0.813rem;
        }
    }
}

</style>