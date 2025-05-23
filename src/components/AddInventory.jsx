import { db } from "../firebase";
import { ref, set } from "firebase/database";
import uuid from 'react-uuid';

export default function AddInventory ({setShowAddItem}) {
    const handleSubmitFormData = (e) => {
        e.preventDefault()

        const formDataAPI = new FormData(e.target)
        const purchase = Number(formDataAPI.get('purchase'))
        const selling = Number(formDataAPI.get('selling'))
        const stock = Number(formDataAPI.get('stock'))
        const name = formDataAPI.get('name').trim()
        const company = formDataAPI.get('company')

        const newItem = {
            id: uuid(),
            name,
            company,
            purchase,
            selling,
            stock
        }
        set(ref(db, `inventory/${newItem.id}`), newItem)
            .then(() => {
                setShowAddItem(false)
            })
            .catch((error) => {
                console.error("Error adding new item:", error)
            })

    }

        return (
            <div className="modal-overlay" onClick={(e) => {
                // Close modal when clicking outside the form
                if (e.target.className === 'modal-overlay') {
                    setShowAddItem(false);
                }
            }}>
                <div className="add-item-container">
                    <div className="add-item-header">
                        <h1>Add New Item</h1>
                        <button onClick={() => setShowAddItem(false)}>X</button>
                    </div>

                    <form onSubmit={(e) => handleSubmitFormData(e)} className="add-item-form">
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter product name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Select Company</label>
                            <select name="company" id="company" required>
                                <option value="" disabled selected>Select Company</option>
                                <option value="Baydoon">Baydoon</option>
                                <option value="Ghenwa">Ghenwa</option>
                                <option value="GoCami">GoCami</option>
                            </select>
                        </div>

                        <div className="price-add">
                            <div className="form-group">
                                <label htmlFor="stock">Stock Quantity</label>
                                <input type="number" name="stock" id="stock" min="0" placeholder="0" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="purchase">Purchase Price</label>
                                <input type="number" name="purchase" id="purchase" min="0" step="0.01" placeholder="0.00" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selling">Selling Price</label>
                            <input type="number" name="selling" id="selling" min="0" step="0.01" placeholder="0.00" required />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="add-item-btn">Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }