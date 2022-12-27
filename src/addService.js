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
//     name: String,
//     price: Number,
// }
let Service = {
    name: 'Paquete de Cajas',
    price: 25000,
    createdAt: new Date(),
    updatedAt: new Date(),
};

// agregar a la tabla Address
client.connect(err => {
    const collection = client.db(dbName).collection('Service');
    collection.insertOne(Service, (
        err,
        result
    ) => {
        console.log(result);
        client.close();
    });
});



