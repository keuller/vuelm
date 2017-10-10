import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const config = {
    input: 'src/index.js',

    output: {
        file: 'index.js',
        format: 'umd',
        name: 'Vuelm'
    },

    plugins: [
        resolve({
            module: true
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}

if (process.env.NODE_ENV == 'prod') {
    config.plugins = config.plugins.concat([
        uglify({
            mangle: {
                toplevel: true,
            },
            warnings: false,
            nameCache: {}
        })
    ])
}

export default config
