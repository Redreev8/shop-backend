export default (parrams = {}) => {
    let string = ''
    for (const key in parrams) {
        if (!parrams[key]) continue
        if (string.length !== 0) string += ' AND'
        if (string.length === 0) string += ' WHERE'
        if (parrams[key].match(';')) {
            const numbers = parrams[key].split(';')
            numbers[0] = isNaN(+numbers[0]) ? `'${numbers[0]}'` : +numbers[0] 
            numbers[1] = isNaN(+numbers[1]) ? `'${numbers[1]}'` : +numbers[1] 
            string += ` ${key} >= ${numbers[0]} AND ${key} <= ${numbers[1]}`
            continue
        }
        string += ` ${key}='${parrams[key]}'`
    }
    return string
}