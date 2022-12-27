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
    const collection = db.collection("User");
    collection.find({}).toArray((err, documents) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // console.log(documents);
        // imprmir ids de los documentos, quitar el new ObjectID
        let ids = documents.map(doc => doc._id);
        // quitar el new ObjectID
        ids = ids.map(id => id.toString());
        console.log('Users:', ids);
        // client.close();
        // Llamar a funcion para agregar a la tabla de UserRole los documentos con las siguientes caracteristicas
        // el ids[0] = 63a5c8cbbc49731013947a61
        // el ids[1] = 63a5c8cbbc49731013947a62
        // el ids[3] = 63a5c8cbbc49731013947a63
        // los demas = 63a5c8cbbc49731013947a64
        addUserRole(ids, db);
    });
});

function addUserRole(ids, db) {
    const collection = db.collection("UserRole");
    // ids[0] = 63a5c8cbbc49731013947a61
    // ids[1] = 63a5c8cbbc49731013947a62
    // ids[3] = 63a5c8cbbc49731013947a63
    // los demas = 63a5c8cbbc49731013947a64

    let rolesId = [
        "63a5c8cbbc49731013947a61",
        "63a5c8cbbc49731013947a62",
        "63a5c8cbbc49731013947a63",
        "63a5c8cbbc49731013947a64"
    ];

    let documents = [];
    for (let i = 3; i < ids.length; i++) {
        let document = {
            userId: ObjectID(ids[i]), // agregar oid de la tabla User
            createdAt: new Date(),
            updatedAt: new Date(),
            // agregar oid de la tabla Role
            roleId: ObjectID(rolesId[3])
        };
        documents.push(document);
    }

    for (let i = 0; i < 3; i++) {
        let document = {
            userId: ObjectID(ids[i]),
            createdAt: new Date(),
            updatedAt: new Date(),
            roleId: ObjectID(rolesId[i])
        };
        documents.push(document);
    }
    collection.insertMany(documents, (err, result) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Se agregaron los documentos a la colección UserRole');
        client.close();
    });
}
