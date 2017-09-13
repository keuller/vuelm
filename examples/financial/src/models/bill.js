import { store, types } from 'vuelm'

const Type = types('CLEAN', 'SET', 'VALIDATE')

const state = {
    errors: {},
    id: '',
    title: '',
    dueDate: '',
    paid: false,
    value: 0
}

const updates = {
    [Type.CLEAN](state) {
        return { id:'', title:'', dueDate:'', paid: false, value: 0, errors: {} }
    },

    [Type.VALIDATE](state) {
        let errors = {}

        if (state.title == '') errors['title'] = 'Fill title field.'
        if (state.dueDate == '') errors['dueDate'] = 'Fill Due Date field.'

        let val = parseFloat(state.value)
        if (isNaN(val)) errors['value'] = 'Value field is invalid number.'
        if (val <= 0) 
            errors['value'] = 'Value must be greater than 0.'
        else
            state.value = val

        return {...state, errors }
    }
}

const actions = {
    clean() {
        this.update(Type.CLEAN)
    },

    validate() {
        this.update(Type.VALIDATE)
    }
}

export default store(state, updates, actions)
