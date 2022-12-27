const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const faker = require('faker');

// traer el archivo datasource.json
const config = require('../datasource.json');
// extraer la configuración de la base de datos
const host = config.host;
const port = config.port;
const dbName = config.dbName;
const user = config.user;
const password = config.password;
// construir la cadena de conexión
const uri = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// Esquema de la tabla Address
// {
//     address: Calle 93 # 7- 45
//     createdAt: Date
//     updatedAt: Date
//     locationId: ObjectID 63a5cdf23391d3ebca1b2409
//     latitude: 4.6774228
//     longitude: -74.0495811
//     complement: 'Oficina 101'
// }
let address = {
    address: 'Calle 93 # 7- 45',
    createdAt: new Date(),
    updatedAt: new Date(),
    locationId: ObjectID('63a5cdf23391d3ebca1b2409'),
    latitude: 4.6774228,
    longitude: -74.0495811,
    complement: 'Oficina 101',
    userId: ObjectID('63a9f92ded9c7213e73ea019')
};

// agregar a la tabla Address
client.connect(err => {
    const collection = client.db(dbName).collection('Address');
    collection.insertOne(address, (
        err,
        result
    ) => {
        console.log(result);
        client.close();
    });
});



