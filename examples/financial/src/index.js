import Vue from 'vue'
import 'sass/build.sass'
import 'index.css'
import App from 'components/app'

document.addEventListener('DOMContentLoaded', (ev) => {
    let app = new Vue({
        render: h => h(App)
    })
    app.$mount('#app')
})
