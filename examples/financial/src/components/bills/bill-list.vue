<template>
    <div class="box">
        <bill-list-item v-for="bill in list" v-bind:bill="bill" :key="bill.id" @edit="doEdit" @remove="doRemove"></bill-list-item>

        <article v-show="list.length == 0" class="message is-warning">
            <div class="message-header">
                <p>Warning</p>
            </div>
            <div class="message-body has-text-centered">
                <h4 class="subtitle is-5">No bills found!</h4>
            </div>
        </article>
    </div>
</template>

<script>
    import BillListItem from 'components/bills/bill-list-item'

    export default {
        name: 'bill-list',

        props: ['list'],

        components: { BillListItem },

        methods: {
            doEdit(value) {
                this.$emit('edit', value)
            },

            doRemove(id) {
                this.$emit('remove', id)
            }
        }
    }
</script>
