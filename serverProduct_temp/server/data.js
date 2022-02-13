import bcrypt from 'bcryptjs'
export const data = {
    users: [
        {
            name: 'hello',
            email: '1111@gmail.com',
            password: bcrypt.hashSync('1111', 8),
            isAdmin: true,
        },

        {
            name: 'world',
            email: '2222@gmail.com',
            password: bcrypt.hashSync('2222', 8),
            isAdmin: false,
        },

    ],
    products: [
        {
            _id: '1',
            name: 'shirt',
            price: 100,
            desctiprion: 'this is shirt'
        },
        {
            _id: '2',
            name: 'shirt 2',
            price: 200,
            desctiprion: 'this is shirt wih numbet 2'
        }
    ]
}