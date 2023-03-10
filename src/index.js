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
    // // Agregar el campo logo: https://domiciliarios.s3.us-east-2.amazonaws.com/images/1672433220672-s7kzypn7yha.png a todos los documentos de la colección Company
    // db.collection('Company').updateMany({}, { $set: { logo: 'https://domiciliarios.s3.us-east-2.amazonaws.com/images/1672433220672-s7kzypn7yha.png' } }, (err, result) => {
    //     if (err) {
    //         console.error(err);
    //         process.exit(1);
    //     }
    //     console.log("Actualización exitosa.");
    //     client.close();
    // });

    client.close();
});
