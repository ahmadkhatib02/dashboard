import uuid from 'react-uuid';

const inventory =[
    {
        id: uuid(), 
        name: "Wireless Headphones", 
        company: "Baydoon",
        purchase: 25,
        selling : 45,
        stock : 45
    }, 

    {
        id: uuid(), 
        name: "Smart Watch",
        company : "Baydoon", 
        purchase : 120,
        selling: 199,
        stock: 23
    }
]

export default inventory