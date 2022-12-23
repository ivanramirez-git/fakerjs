const faker = require('faker');

const companies = [];

for (let i = 0; i < 50; i++) {
  const company = {
    name: faker.company.companyName(),
    website: faker.internet.url(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  companies.push(company);
}

// guardar en un archivo llamado <fecha y hora>.json
const fs = require('fs');
const date = new Date();
const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
fs.writeFileSync(fileName, JSON.stringify(companies));
