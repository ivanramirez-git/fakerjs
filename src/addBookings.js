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

// Crear datos en tabla Booking

/*

Esquema:
Campos aleatorios usando faker
{
    date: Date (fecha de la reserva, fecha del pasado)
    state: String ['created', 'confirmed', 'ended']
    addresId: ObjectId 63aa2ca266b5a9760f666b18
    serviceId: ObjectId 63aa2e1f6db6d149f3908882
    companyId: ObjectId 63a5f62de3c4be1dce58c707

    customerId: ObjectId userId de la tabla UserRole, donde el roleId es igual a 63a5c8cbbc49731013947a64
    domiciliaryId: ObjectId userId de la tabla UserRole, donde el roleId es igual a 63a5c8cbbc49731013947a63
    schedulerId: ObjectId userId de la tabla UserRole, donde el roleId es igual a 63a5c8cbbc49731013947a62

    Solo puede tener un domiciliario o un programador o un cliente

    locationId: ObjectId 63a5cdf23391d3ebca1b2409
    content: String (contenido de la reserva, ejemplo zapatos, ropa, etc, un producto, productName de faker)
    unit: String ['kg', 'lb', 'g', 'oz', 'l', 'ml', 'gal', 'qt']
    weight: Number (peso del producto, un número entre 1 y 100)
    height: Number (altura del producto, un número entre 1 y 100)
    broad: Number (ancho del producto, un número entre 1 y 100)
    length: Number (largo del producto, un número entre 1 y 100)
    insuredValue: Number (valor asegurado, un número entre 1 y 1000000)
    declaredValue: Number (valor declarado, un número entre 1 y 10000000)
    createdAt: Date (fecha de creación, fecha actual)
    updatedAt: Date (fecha de actualización, fecha actual)

*/

const admins = ["63a5c7b1bc49731013947a60",] // admin
const scheduler = ["63a5c7b1bc49731013947a61",] // scheduler
const transportador = ["63a5c7b1bc49731013947a62",] // transportador
const cliente = [
    "63a5c7b1bc49731013947a63",
    "63a9f63dd95f58d4c0d0440d",
    "63a9f63dd95f58d4c0d0440e",
    "63a9f63dd95f58d4c0d0440f",
    "63a9f693ed9c7213e73ea014",
    "63a9f693ed9c7213e73ea015",
    "63a9f92ded9c7213e73ea017",
    "63a9f92ded9c7213e73ea018",
    "63a9f92ded9c7213e73ea019",
    "63a9f92ded9c7213e73ea01a",
    "63a9f92ded9c7213e73ea01b",
    "63a9f92ded9c7213e73ea01c",
    "63a9f92ded9c7213e73ea01d",
    "63a9f92ded9c7213e73ea01e",
    "63a9f92ded9c7213e73ea01f",
    "63a9f92ded9c7213e73ea020",
    "63a9f92ded9c7213e73ea021",
    "63a9f92ded9c7213e73ea022",
    "63a9f92ded9c7213e73ea023",
    "63a9f92ded9c7213e73ea024",
    "63a9f92ded9c7213e73ea025",
    "63a9f92ded9c7213e73ea026",
    "63a9f92ded9c7213e73ea027",
    "63a9f92ded9c7213e73ea028",
    "63a9f92ded9c7213e73ea029",
    "63a9f92ded9c7213e73ea02a",
    "63a9f92ded9c7213e73ea02b",
    "63a9f92ded9c7213e73ea02c",
    "63a9f92ded9c7213e73ea02d",
    "63a9f92ded9c7213e73ea02e",
    "63a9f92ded9c7213e73ea02f",
    "63a9f92ded9c7213e73ea030",
    "63a9f92ded9c7213e73ea031",
    "63a9f92ded9c7213e73ea032",
    "63a9f92ded9c7213e73ea033",
    "63a9f92ded9c7213e73ea034",
    "63a9f92ded9c7213e73ea035",
    "63a9f92ded9c7213e73ea036",
    "63a9f92ded9c7213e73ea037",
    "63a9f92ded9c7213e73ea038",
    "63a9f92ded9c7213e73ea039",
    "63a9f92ded9c7213e73ea03a",
    "63a9f92ded9c7213e73ea03b",
    "63a9f92ded9c7213e73ea03c",
    "63a9f92ded9c7213e73ea03d",
    "63a9f92ded9c7213e73ea03e",
    "63a9f92ded9c7213e73ea03f",
    "63a9f92ded9c7213e73ea040",
    "63a9f92ded9c7213e73ea041",
    "63a9f92ded9c7213e73ea042",
    "63a9f92ded9c7213e73ea043"
]

function createBooking() {
    return {
        date: new Date(),
        state: faker.random.arrayElement(['created', 'confirmed', 'ended']),
        addresId: new ObjectID('63aa2ca266b5a9760f666b18'),
        serviceId: new ObjectID('63aa2e1f6db6d149f3908882'),
        companyId: new ObjectID('63a5f62de3c4be1dce58c707'),
        customerId: new ObjectID(faker.random.arrayElement(cliente)),
        domiciliaryId: new ObjectID(faker.random.arrayElement(transportador)),
        schedulerId: new ObjectID(faker.random.arrayElement(scheduler)),
        locationId: new ObjectID('63a5cdf23391d3ebca1b2409'),
        content: faker.commerce.productName(),
        unit: faker.random.arrayElement(['kg', 'lb', 'g', 'oz', 'l', 'ml', 'gal', 'qt']),
        weight: faker.random.number(100),
        height: faker.random.number(100),
        broad: faker.random.number(100),
        length: faker.random.number(100),
        insuredValue: faker.random.number(1000000),
        declaredValue: faker.random.number(10000000),
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

// create 100 bookings
async function createBookings() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Booking');
    const bookings = [];
    for (let i = 0; i < 100; i++) {
        bookings.push(createBooking());
    }
    await collection.insertMany(bookings);
    await client.close();
}

// create 100 bookings
createBookings();

// log
console.log('Done');
