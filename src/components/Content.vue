<template>
  <div id="content">
        <div class="content-header">
            <p class="header-category">category_name</p>
            <p class="header-id">{{ content.id }}</p>
        </div>
        <div class="content-info">
            <p class="content-id">{{ content.user_id }}</p>
            <p class="content-date">created_at({{ dateFormat(content.created_at) }})</p>
        </div>
        <div class="content-data">
            <p class="content-title">{{ content.title }}</p>
            <p class="content-contents">{{ content.contents }}</p>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        content: {
        type: Object,
        },
    },
    methods : {
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
#content {
    font-size: 0.813rem;
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

    .content-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        margin-bottom: 17px;
        border-bottom: $border;
        line-height: 1.92;

        .header-category {
            color: #7e848a;
        }

        .header-id {
            color: #adb5bd;
        }
    }

    .content-info {
         display: flex;
         line-height: 1.92;
         margin-bottom: 15px;

        .content-id {
            color: $comento-green;
            padding-right: 0.813rem;
            margin-right: 0.813rem;
            border-right: $border;
        }

        .content-date {
            color: $sub-font-color;
        }
    }

    .content-data {
        line-height: 1.56;

        .content-title {
           @include Title;
           white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .content-contents {
           @include Contents;
           white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>