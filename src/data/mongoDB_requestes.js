db.users.insertOne({
    login: "Anna99",
    password: "anna",
    name: "Anna",
    age: 29
})

// DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.

db.users.insertMany([{
    login: "Daria99",
    password: "daria",
    name: "Daria",
    age: 22
},
{
    login: "Petr99",
    password: "petr",
    name: "Petr",
    age: 27
},
{
    login: "Sebastian99",
    password: "sebastian",
    name: "Sebastian",
    age: 108
},
])