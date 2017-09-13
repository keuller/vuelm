
export function formatDate(value) {
    let dt = new Date(value)
    let year = dt.getFullYear(), month = dt.getMonth() + 1, day = dt.getDate()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    return `${day}/${month}/${year}`
}

export function convertDate(value) {
    let values = value.split('/')
    return `${values[2]}-${values[1]}-${values[0]} 00:00:00`
}

export function formatMoney(value) {
    let val = new Number(value)
    return `\$ ${val.toFixed(2)}`
}
