import bcrypt from 'bcrypt';
const data = {
    users: [
        {
            name: 'Oybek',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Shoxzod',
            email: 'user@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numberReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.0,
            numberReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numberReviews: 17,
            description: 'High quality product'
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 78,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.5,
            numberReviews: 14,
            description: 'High quality product'
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 12,
            brand: 'Puma',
            rating: 4.5,
            numberReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4.5,
            numberReviews: 15,
            description: 'High quality product'
        }
    ]
}
export default data;