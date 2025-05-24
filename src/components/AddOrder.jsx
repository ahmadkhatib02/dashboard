import { useState } from 'react';
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import uuid from 'react-uuid';

export default function AddOrder ({setShowAddOrder, inventory}){

    const [addItem, setaddItem] = useState(0)

    // Function to reset form and close modal
    function handleCloseModal() {
        setaddItem(0);
        setShowAddOrder(false);
    }

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

        // Validation 1: Check if at least one item has been added
        if (addItem === 0) {
            alert("❌ Please add at least one item to the order before submitting.");
            return;
        }

        const formDataAPI = new FormData(e.target)
        const fullName = formDataAPI.get('fullName')
        const phone = formDataAPI.get('phone')

        // Validation 2: Check customer information
        if (!fullName || fullName.trim() === '') {
            alert("❌ Please enter a customer name.");
            return;
        }

        if (!phone || phone.trim() === '') {
            alert("❌ Please enter a phone number.");
            return;
        }

        const order = []
        let hasValidItems = false;

        // Process each item with strict validation
        for (let i = 0; i < addItem; i++) {
            const itemName = formDataAPI.get(`item${i}`)
            const quantity = Number(formDataAPI.get(`quantity${i}`))

            // Validation 3: Check if item is selected
            if (!itemName || itemName === '') {
                alert(`❌ Please select an item for item #${i + 1}.`);
                return;
            }

            // Validation 4: Check if quantity is valid
            if (!quantity || quantity <= 0 || isNaN(quantity)) {
                alert(`❌ Please enter a valid quantity (greater than 0) for item #${i + 1}.`);
                return;
            }

            // Find the item in inventory
            const inventoryItem = inventory.find(item => item.name === itemName)

            // Validation 5: Check if item exists in inventory
            if (!inventoryItem) {
                alert(`❌ Item "${itemName}" not found in inventory.`);
                return;
            }

            // Validation 6: Check if enough stock is available
            if (quantity > inventoryItem.stock) {
                alert(`❌ Not enough stock for "${itemName}". Available: ${inventoryItem.stock}, Requested: ${quantity}`);
                return;
            }

            const price = inventoryItem.selling;

            order.push({
                id: uuid(),
                name: itemName,
                quantity: quantity,
                price: price
            })

            hasValidItems = true;
        }

        // Final validation: Ensure we have valid items
        if (!hasValidItems || order.length === 0) {
            alert("❌ No valid items found. Please add at least one item with proper details.");
            return;
        }

        // Calculate total for confirmation
        const total = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Confirmation dialog
        const confirmMessage = `📋 Order Summary:
👤 Customer: ${fullName}
📞 Phone: ${phone}
📦 Items: ${order.length}
💰 Total: $${total.toFixed(2)}

Do you want to create this order?`;

        if (!confirm(confirmMessage)) {
            return;
        }

        const newOrder = {
            id: uuid(),
            fullName: fullName.trim(),
            phone: Number(phone),
            order,
            date: new Date().toISOString()
        }

        // Final safety check before saving
        if (!newOrder.order || newOrder.order.length === 0) {
            alert("❌ Error: Cannot create order without items.");
            return;
        }

        set(ref(db, `orders/${newOrder.id}`), newOrder)
            .then(() => {
                alert("✅ Order created successfully!");
                handleCloseModal();
            })
            .catch((error) => {
                console.error("Error adding new order:", error);
                alert("❌ Error creating order. Please try again.");
            })

    }


    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target.className === 'modal-overlay') {
                handleCloseModal();
            }
        }}>
            <div className='add-item-container'>
                <div className='add-item-header'>
                    <h1>Add New Order</h1>
                    <button className='close-btn' onClick={handleCloseModal}>X</button>
                </div>

                <form onSubmit={(e) => handleSubmitFormData(e)} onKeyDown={(e) => {
                    if (e.key === 'Enter' && addItem === 0) {
                        e.preventDefault();
                        alert("❌ Please add at least one item before submitting.");
                    }
                }}>
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