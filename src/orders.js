import uuid from 'react-uuid';

const orders = [
    {
        id: uuid(),
        fullName: "John Doe",
        phone: 71123456, 
        order: [
            {
                id: uuid(),
                name: "Wireless Headphones",
                quantity: 2, 
                price: 45
            },
            {
                id: uuid(),
                name: "Smart Watch",
                quantity: 1, 
                price: 199
            }
        ], 
        date: new Date().toISOString()
    }, 
    {
        id: uuid(),
        fullName: "Jane Smith",
        phone: 71123456, 
        order: [
            {
                id: uuid(),
                name: "Wireless Headphones",
                quantity: 1, 
                price: 45
            },
            {
                id: uuid(),
                name: "Smart Watch",
                quantity: 2, 
                price: 199
            }
        ], 
        date: new Date().toISOString()
    }

]

export default orders