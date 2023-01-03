const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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
client.connect(err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Conexión establecida con éxito.");
    const db = client.db(dbName);
    const collection = db.collection("Booking");
    // Cambiar el key addresId por addressId sin modificar los datos de booking
    collection.updateMany(
        {},
        { $rename: { "addresId": "addressId" } }
    )
        .then(result => {
            console.log(`Se han actualizado ${result.modifiedCount} documentos.`);
        })
        .catch(error => {
            console.error(error);
        });
});
