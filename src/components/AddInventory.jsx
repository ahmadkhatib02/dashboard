export default function AddInventory () {
    const handleSubmitFormData = (e) => {
        e.preventDefault()

        const formDataAPI = new FormData(e.target)
        const dataObject = Object.fromEntries(formDataAPI)
        console.log('As object:', dataObject)
        
        //Note to self : Convert the numbers into numbers please
    }

        return (
            <div>
                <div>
                    <h1>Add New Inventory Item</h1>
                    <button>X</button>
                </div>
                
                <form onSubmit={(e) => handleSubmitFormData(e)}>
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" id="name" required />
                    </div>

                    <div>
                        <label htmlFor="company">Select Company</label>
                        <select name="company" id="company" required>
                            <option value="" disabled>Select Company</option>
                            <option value="Baydoon">Baydoon</option>
                            <option value="Ghenwa">Ghenwa</option>
                            <option value="GoCami">GoCami</option>
                        </select>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="stock">Stock Quantity</label>
                            <input type="number" name="stock" id="stock" required />
                        </div>

                        <div>
                            <label htmlFor="purchase">Purchase Price</label>
                            <input type="number" name="purchase" id="purchase" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="selling">Selling Price</label>
                        <input type="number" name="selling" id="selling" required />
                    </div>

                    <div>
                        <button type="submit">Add Item</button>
                    </div>
                </form>
            </div>
        )
    }