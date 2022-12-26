const faker = require('faker');

const data = [];

for (let i = 0; i < 50; i++) {
  // crear un objeto con los datos
  // name, lastname, username, email, password, origin, birthdate, docType, document, phone, roles, createdAt, updatedAt

  // Cosas a considerar: 

  // todos los password seran: $2a$10$Sv6KzLe07n4LYPlbC4HQK.SpzhpixXHRzjBWQdRCkk.gpVSZRu6Dq
  // roles admitidos: {admin:63a5c8cbbc49731013947a61},{scheduler:63a5c8cbbc49731013947a62},{transportador:63a5c8cbbc49731013947a63},{destinatario:63a5c8cbbc49731013947a64}
  // roles: [<id de 1 rol>] // debe estar dentro de corchetes
  // username = email
  // createdAt = updatedAt = fecha actual
  // origin = 'dashboard'

  let email = faker.internet.email();
  let date = new Date();

  const dato = {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: email,
    email: email,
    password: '$2a$10$Sv6KzLe07n4LYPlbC4HQK.SpzhpixXHRzjBWQdRCkk.gpVSZRu6Dq',
    origin: 'dashboard',
    birthdate: faker.date.past(),
    document: faker.datatype.number(),
    phone: faker.phone.phoneNumber(),
    roles: [faker.random.arrayElement(['63a5c8cbbc49731013947a61', '63a5c8cbbc49731013947a62', '63a5c8cbbc49731013947a63', '63a5c8cbbc49731013947a64'])],
    docType: faker.random.arrayElement(['CC', 'TI', 'CE']),
    createdAt: date,
    updatedAt: date,
  };
  data.push(dato);
}

// guardar en un archivo llamado <fecha y hora>.json
const fs = require('fs');
const date = new Date();
const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
fs.writeFileSync(fileName, JSON.stringify(data));
