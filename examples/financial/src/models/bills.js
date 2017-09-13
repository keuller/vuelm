import { store, types } from 'vuelm'
import { convertDate } from 'utils'

const Type = types('ADD', 'REMOVE', 'UPDATE', 'APPLY_FILTER')

const sortByDate = (b1, b2) => {
    let dt1 = new Date(b1.dueDate), dt2 = new Date(b2.dueDate)
    return ((dt1 > dt2)  ? 1 : (dt1 < dt2) ? -1 : 0)
}

const sum = (list) => list.reduce((prev, bill) => prev + bill.value, 0)
const filterByPaid = (list) => list.filter(bill => bill.paid == true)
const filterByUnpaid = (list) => list.filter(bill => bill.paid == false)
const filterByOverdue = (list) => list.filter(bill => {
    let dueDate = new Date(bill.dueDate), today = new Date()
    return (bill.paid == false && dueDate < today)
})

const FIXTURE = [
    { id:'agbd43', title: 'Netflix', dueDate: '2017-09-05 00:00:00', value: 15.99, paid: true },
    { id:'fve491', title: 'Internet', dueDate: '2017-09-10 00:00:00', value: 59.99, paid: false },
    { id:'6tg2x0', title: 'Gas', dueDate: '2017-09-15 00:00:00', value: 15.5, paid: false }
]

const state = {
    raw: FIXTURE,
    bills: FIXTURE,
    filter: 'ALL',
    balance: sum(FIXTURE)
}

const updates = {
    [Type.APPLY_FILTER](state, value) {
        switch(value) {
            case 'PAID': {
                state.bills = filterByPaid(state.raw)
                break
            }
            case 'UNPAID': {
                state.bills = filterByUnpaid(state.raw)
                break
            }
            case 'OVERDUE': {
                state.bills = filterByOverdue(state.raw)
                break
            }
            default: state.bills = [...state.raw]
        }
        
        state.filter = value
        state.balance = sum(state.bills)
        state.bills.sort(sortByDate)

        return {...state}
    },

    [Type.ADD](state, bill) {
        bill.id = 'xyz' + Math.round(Math.random() * 2 + 1)
        bill.dueDate = convertDate(bill.dueDate)
        bill.paid = false
        state.raw.push(bill)

        return {...state}
    },

    [Type.UPDATE](state, bill) {
        let nBills = state.raw.filter(item => item.id !== bill.id)
        bill.dueDate = convertDate(bill.dueDate)
        nBills.push(bill)

        return {...state, raw: nBills}
    },

    [Type.REMOVE](state, id) {
        let nBills = state.raw.filter(bill => bill.id != id)
        return {...state, raw: nBills}
    }

}

const actions = {
    applyFilter(value) {
        this.update(Type.APPLY_FILTER, value)
    },

    addBill(bill) {
        const { filter } = this.state()
        this.update(Type.ADD, bill)
        this.applyFilter(filter)
    },

    updateBill(bill) {
        const { filter } = this.state()
        this.update(Type.UPDATE, bill)
        this.applyFilter(filter)
    },

    removeBill(id) {
        const { filter } = this.state()
        this.update(Type.REMOVE, id)
        this.applyFilter(filter)
    }
}

export default store(state, updates, actions)
