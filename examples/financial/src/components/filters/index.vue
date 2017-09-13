<template>
    <div class="tabs is-centered">
        <ul>
            <li :class="allActive"><a @click.prevent="all">All</a></li>
            <li :class="unpaidActive"><a @click.prevent="unpaid">Unpaid Bills</a></li>
            <li :class="paidActive"><a @click.prevent="paid">Paied Bills</a></li>
            <li :class="overdueActive"><a @click.prevent="overdue">Overdue Bills</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'filters',

        props: ['value'],

        computed: {
            allActive() {
                return (this.value == 'ALL' ? 'is-active' : '')
            },
            unpaidActive() {
                return (this.value == 'UNPAID' ? 'is-active' : '')
            },
            paidActive() {
                return (this.value == 'PAID' ? 'is-active' : '')
            },
            overdueActive() {
                return (this.value == 'OVERDUE' ? 'is-active' : '')
            }
        },

        methods: {
            all() {
                this.$emit('all')
            },
            unpaid() {
                this.$emit('unpaid')
            },
            paid() {
                this.$emit('paid')
            },
            overdue() {
                this.$emit('overdue')
            }
        }
    }
</script>
