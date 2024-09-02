const getAction = ({ number, plu, shopId, onShelf, inOrder } ) => {
    if (plu && !shopId && !onShelf && !inOrder) return 'create products'
    if (plu && shopId && onShelf && inOrder) return 'create products other'
    if (plu && number && number < 0) return `decrease ${number}`
    if (plu && number && number > 0) return `increase ${number}`
}

export default async (req, res, next) => {
    try {
        const result = await fetch('http://localhost:1222/api/action-product', {
            method: 'POST',
            body: JSON.stringify({
                action: getAction(req.body),
                plu: req.body.plu,
                shopId: req.body.shopId
            }),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            mode: 'same-origin',
        })
        if (result.message) console.log(result.message);
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Сервис не доступен'})
    }
};