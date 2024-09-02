export default (count = 0, numberReturnAction = 1) => {
    if (count === 0) return 0
    const numberPages = Math.ceil(count.rows[0].count / numberReturnAction)
    return numberPages
}