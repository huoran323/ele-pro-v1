<template>
    <!-- <exception-page type="404"></exception-page> -->
    <div>
        <div
            class="infinite-list-wrapper"
            style="height: 10px"
            infinite-scroll-distance="40"
        >
            <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
            >
                <li v-for="(i, k) in count" class="list-item" :key="k">
                    {{ i }}
                </li>
            </ul>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>
<script>
import ExceptionPage from '@/components/Exception';
export default {
    components: { ExceptionPage },
    data() {
        return {
            count: 10,
            loading: false,
            iheight: '10px',
        };
    },
    computed: {
        noMore() {
            return this.count >= 80;
        },
        disabled() {
            return this.loading || this.noMore;
        },
    },
    methods: {
        load() {
            this.loading = true;
            console.log('count: ', this.count);
            setTimeout(() => {
                this.count += 2;
                this.loading = false;
            }, 2000);
        },
    },
};
</script>
<style scoped lang="less">
.infinite-list-wrapper {
    // height: 400px;
    background-color: #f8f8f8;

    .list {
        padding: 20px;
        .list-item {
            background-color: #e4f1fe;
            height: 40px;
            text-align: center;
            line-height: 40px;
            margin-top: 10px;
        }
    }
}
</style>
