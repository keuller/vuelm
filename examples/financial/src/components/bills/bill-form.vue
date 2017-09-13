<template>
    <div class="card">
        <div class="card-content">
            <form action="#">
                <div class="field">
                    <label for="name" class="label">Title</label>
                    <div class="control has-icons-right">
                        <input type="text" class="input" name="title" v-model.lazy="title" maxlength="30" />
                        <span v-show="errors.title" class="icon is-small is-right">
                            <i class="fa fa-warning"></i>
                        </span>
                    </div>
                    <p v-show="errors.title" class="help is-danger">{{errors.title}}</p>
                </div>

                <div class="field">
                    <label for="name" class="label">Due Date</label>
                    <div class="control has-icons-right">
                        <input type="text" class="input" name="dueDate" v-model.lazy="dueDate" maxlength="12" />
                        <span v-show="errors.dueDate" class="icon is-small is-right">
                            <i class="fa fa-warning"></i>
                        </span>
                    </div>
                    <p v-show="errors.dueDate" class="help is-danger">{{errors.dueDate}}</p>
                </div>

                <div class="field">
                    <label for="name" class="label">Value $</label>
                    <div class="control has-icons-right">
                        <input type="text" class="input" name="value" v-model.lazy="value" maxlength="10" />
                        <span v-show="errors.value" class="icon is-small is-right">
                            <i class="fa fa-warning"></i>
                        </span>
                    </div>
                    <p v-show="errors.value" class="help is-danger">{{errors.value}}</p>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="checkbox"></label>
                            <input type="checkbox" v-model="paid" />
                            Is Paid ?
                        </label>
                    </div>
                </div>
            </form>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item" @click.prevent="save">Save</a>
            <a href="#" class="card-footer-item" @click.prevent="cancel">Cancel</a>
        </footer>
    </div>
</template>

<script>
    import { connect } from 'vuelm'
    import bill from 'models/bill'

    const BillForm = {
        name: 'bill-form',

        data() {
            return {
                errors: {},
                id: '',
                title: '',
                dueDate: '',
                paid: false,
                value: 0
            }
        },

        methods: {
            save() {
                this.sync(this.$data)
                this.validate()

                let errors = this.state().errors
                if (Object.keys(errors).length > 0) return

                let formData = this.state()
                delete formData['errors']

                this.$emit('save', {...formData})
                this.clean()
            },

            cancel() {
                this.clean()
            }
        }
    }

    export default connect(BillForm, { bill })
</script>
