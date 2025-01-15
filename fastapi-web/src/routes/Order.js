import { useEffect, useState } from "react";

const PRODUCTS_URL = 'http://localhost:8000/'
const ORDERS_URL = 'http://localhost:8001/'

export const Order = () =>
{
    const [id, setId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {

        if (id === null) {

            console.log("in log: " + id);

           fetch(PRODUCTS_URL + 'product/' + id)
                .then(response => {
                if (response.ok) {
                    return response.json()
                 }
                throw response
                })
                .then (data => {
                    const price = parseFloat(data.price) * 1.2
                    setMessage(`Your product price is $${price}`)
                }
    )
    }

    }, [id])

    const handleCreate = ((event) => {

        event.preventDefault()

        const json_string = JSON.stringify({
            'product_id': id,
            'quantity': quantity

        })
        
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'

            }),
            body: json_string
        }

        console.log("order_url=" + ORDERS_URL + "orders" + "requestOptions=" + requestOptions)

        fetch(ORDERS_URL + 'orders', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw response

            }
        })
        .then (data => {
            setMessage(`Order for ${quantity} items sent`)
        })
        .catch(error => {
            console.log(error)
        })

    })

    return (
        <div className="body">
            <div className="order_title title">Order</div>
            <div>
                <input className="input-1" placholder="Product ID"
                    onChangeCapture={(event) => setId(event.target.value)} />
            </div>
            <div>
                <input className="input-1" placholder="Quantity"
                    onChangeCapture={(event) => setQuantity(event.target.value)} />
            </div>
            <button className="button-4" onClick={handleCreate}>
                Place Order
            </button>
            <div className="form_message">
                {message}
            </div>
        </div>
    )
}