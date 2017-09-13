<template>
    <div class="columns">
        <div class="column is-4">
            <bill-form ref="billForm" @save="doSave"></bill-form>
        </div>
        <div class="column">
            <bill-list :list="list" @edit="doEdit" @remove="doRemove"></bill-list>
        </div>
    </div>
</template>

<script>
    import { formatDate } from 'utils'
    import BillForm from 'components/bills/bill-form'
    import BillList from 'components/bills/bill-list'
    import bills from 'models/bills'

    export default {
        name: 'bills',

        props: ['list'],

        components: { BillForm, BillList },

        methods: {
            doSave(value) {
                if (value.id == '') {
                    bills.addBill(value)
                } else
                    bills.updateBill(value)
            },

            doEdit(value) {
                value.dueDate = formatDate(value.dueDate)
                this.$refs.billForm.sync(value)
            },

            doRemove(id) {
                bills.removeBill(id)
            }
        }
    }
</script>
