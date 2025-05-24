import { useState } from 'react';
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import uuid from 'react-uuid';

export default function AddOrder ({setShowAddOrder, inventory}){

    const [addItem, setaddItem] = useState(0)

    function manageMultipleItems () {
        return Array.from({ length: addItem }, (_, i) =>(
            <div key={i} className='item-container margin-top'>
                <div className='form-group'>
                    <label htmlFor={`item${i}`}>Item</label>
                    <select name={`item${i}`} id={`item${i}`} required>
                        <option value="" disabled>Select Item</option>
                        {inventory.map((item) => (
                            <option key={item.id} value={item.name} data-price={item.selling}>
                                {item.name} - ${item.selling}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor={`quantity${i}`}>Quantity</label>
                    <input type="number" name={`quantity${i}`} id={`quantity${i}`} min="1" required />
                    <input type="hidden" name={`price${i}`} value="" />
                </div>

                    {addItem > 0 && <button type="button" className='remove-item-btn' onClick={() => setaddItem(prev => prev - 1)}>Remove Item</button>}
            </div>
        ))

    }

    function handleSubmitFormData (e) {
        e.preventDefault()

        if (addItem === 0) {
            alert("Please add at least one item to the order before submitting.");
            return;
        }

        const formDataAPI = new FormData(e.target)
        const fullName = formDataAPI.get('fullName')
        const phone = formDataAPI.get('phone')
        const order = []
        for (let i = 0; i < addItem; i++) {
            const itemName = formDataAPI.get(`item${i}`)
            const quantity = Number(formDataAPI.get(`quantity${i}`))

            if (itemName && quantity > 0) {
                const inventoryItem = inventory.find(item => item.name === itemName)
                const price = inventoryItem ? inventoryItem.selling : 0

                order.push({
                    id: uuid(),
                    name: itemName,
                    quantity: quantity,
                    price: price
                })
            }
        }

        if (order.length === 0) {
            alert("Please select items and enter valid quantities before submitting.");
            return;
        }

        const newOrder = {
            id: uuid(),
            fullName,
            phone: Number(phone),
            order,
            date: new Date().toISOString()
        }

        set(ref(db, `orders/${newOrder.id}`), newOrder)
            .then(() => {
                setShowAddOrder(false)
            })
            .catch((error) => {
                console.error("Error adding new order:", error)
            })

    }


    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target.className === 'modal-overlay') {
                setShowAddOrder(false);
            }
        }}>
            <div className='add-item-container'>
                <div className='add-item-header'>
                    <h1>Add New Order</h1>
                    <button className='close-btn' onClick={() => setShowAddOrder(false)}>X</button>
                </div>

                <form onSubmit={(e) => handleSubmitFormData(e)}>
                    <div className='form-group'>
                        <label htmlFor="fullName">Customer Name</label>
                        <input type="text" name="fullName" id="fullName" required />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name="phone" id="phone" required/>
                    </div>

                    <div className='form-group'>
                        <div className='items-header'>
                            <div><label>Items</label></div>
                            <button type="button" className='add-item-btn' onClick={() => setaddItem(prev => prev + 1)}>+ Add Item</button>
                        </div>

                        <div className='items-container'>
                            {addItem === 0 ? (
                                <div className='no-items-message'>
                                    <p>No items added yet. Click "+ Add Item" to start adding items to this order.</p>
                                </div>
                            ) : (
                                manageMultipleItems()
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={addItem === 0}
                        className={addItem === 0 ? 'add-item-form-submit disabled' : 'add-item-form-submit'}
                    >
                        Add Order {addItem === 0 && '(Add at least 1 item)'}
                    </button>
                </form>
            </div>
        </div>
    )
}