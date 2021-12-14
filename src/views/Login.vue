<template>
    <div>
        登录页<input type="button" value="登录" @click="login">
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        login(){
                this.$router.replace('/overall')
        },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
