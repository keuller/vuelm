<template>
    <div class="card">
        <div class="card-content">
            <div class="is-pulled-right">$ {{bill.value.toFixed(2)}}</div>
            <p>{{bill.title}}</p>
            <div v-show="!bill.paid" class="info is-pulled-right"><a @click.prevent="edit">Edit</a></div>
            <div v-show="bill.paid" class="info is-pulled-right"><a @click.prevent="remove">Remove</a></div>
            <div class="info">Due date: {{bill.dueDate | toDate}}</div>
        </div>
    </div>
</template>

<script>
    import { formatDate } from 'utils'
    
    export default {
        name: 'bill-list-item',

        props: ['bill'],

        filters: {
            toDate(value) {
                return formatDate(value)
            }
        },

        methods: {
            edit() {
                this.$emit('edit', {...this.bill})
            },

            remove() {
                this.$emit('remove', this.bill.id)
            }
        }
    }
</script>

<style scoped>
    .info { font-size: 0.8rem; text-transform: uppercase; }
</style>

