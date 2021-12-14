<template>
    <div>
        <single v-if="shownum===0" :sho="shownum"></single>
        <multiple v-if="shownum===1"></multiple>
        <judge v-if="shownum===2"></judge>
        <gap v-if="shownum===3"></gap>
        <questions v-if="shownum===4"></questions>
        <combination v-if="shownum===5"></combination>
        <record v-if="shownum===6"></record>
    </div>
</template>

<script>
import single from './titletype/single.vue'
import multiple from './titletype/multiple.vue'
import judge from './titletype/judge.vue'
import gap from './titletype/gap.vue'
import questions from './titletype/questions.vue'
import combination from './titletype/combination.vue'
import record from './titletype/record.vue'
export default {
    props: {
        shownum:{
            type:Number,
            default:0
        }
    },
    components: {
    single,
    multiple,
    judge,
    gap,
    questions,
    combination,
    record,
    },
};
</script>

<style scoped lang="less">

</style>
