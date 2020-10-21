<template>
    <div></div>
</template>
<script>
import { getTableList } from '@/api/testApi';
export default {
    data() {
        return {};
    },
    mounted() {
        this.getTableList();
    },
    methods: {
        getTableList() {
            getTableList().then((res) => {
                console.log(res);
            });
        },
    },
};
</script>
<style lang="scss"></style>
