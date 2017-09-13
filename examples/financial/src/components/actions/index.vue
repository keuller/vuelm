<template>
    <div class="columns">
        <div class="column">
            <h4 class="title is-4">My Account</h4>
        </div>
        <div class="column">
            <h4 class="subtitle is-4 is-pulled-right">Balance {{total | money}}</h4>
        </div>
    </div>
</template>

<script>
    import { formatMoney } from 'utils'

    export default {
        name: 'actions',

        props: ['total'],

        filters: {
            money(value) {
                return formatMoney(value)
            }
        }
    }
</script>
