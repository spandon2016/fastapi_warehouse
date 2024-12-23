import { useState } from "react"
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/"

export const ProductsCreate = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const navigate = useNavigate()

    const handleCreate = (event) => {
        console.log("in handle create")
        event?.preventDefault()

        const json_string = JSON.stringify({ name, price, quantity})
        console.log("json_string= " + json_string);

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: json_string
        }
        /*
        curl -X 'POST' \
        'http://localhost:8000/product' \
            -H 'accept: application/json' \
             -H 'Content-Type: application/json' \
             -d '{

             "name": "bed111",
            "price": 10,
            "quantity": 2
            }'
        */
 

       console.log("string=" + BASE_URL + 'product' + requestOptions)
        // console.log("requestOptions= " + requestOptions.stringify())

        fetch(BASE_URL + 'product', requestOptions)
            .then(response => {
             if (!response.ok) {
                  throw response
              }
            })
            .then(data => {
               navigate('/')
            })
            .catch(error => {
            console.log(error)
            })
    }


    return (
        <div className="new_product body">
            <div className="new_product_title title">Create a new product </div>
            <div>
                <input className="input-1" placeholder="Name"
                    onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <input className="input-1" placeholder="Price"
                onChange={(event) => setPrice(event.target.value)} />
            </div>
            <div>
                <input className="input-1" placeholder="Price"
                onChange={(event) => setQuantity(event.target.value)} />
            </div>
            <button className="button-4" onClick={handleCreate}>Create product</button>       
        </div>

    )


}