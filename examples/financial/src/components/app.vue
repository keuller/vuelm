<template>
    <main>
        <top-nav></top-nav>
        <div class="hero" style="margin-top: 4rem;">
            <div class="container">
                <div class="box">
                    <actions :total="balance"></actions>
                    <filters :value="filter" @all="applyFilter('ALL')" 
                        @paid="applyFilter('PAID')" 
                        @unpaid="applyFilter('UNPAID')" 
                        @overdue="applyFilter('OVERDUE')"></filters>
                    <bills :list="bills"></bills>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import { connect } from 'vuelm'
    import TopNav  from 'components/topnav'
    import Actions from 'components/actions'
    import Filters from 'components/filters'
    import Bills   from 'components/bills'
    import bills   from 'models/bills'

    const App = {
        name: 'app',

        components: { TopNav, Actions, Filters, Bills },

        data() {
            return {
                filter: 'ALL',
                bills: [],
                balance: 0
            }
        }
    }

    export default connect(App, { bills })
</script>
