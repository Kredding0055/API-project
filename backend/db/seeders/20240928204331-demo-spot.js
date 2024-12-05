// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };


'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        country: "USA",
        name: "Cozy Cottage",
        description: "Charming vacation rental with private patio",
        lat: 37442111,
        lng: -12123444,
        price: 200,
        ownerId: 3
      },
      {
        address: "456 Elm St",
        city: "Othertown",
        state: "NY",
        country: "USA",
        name: "Modern Loft",
        description: "Stylish urban retreat with rooftop views",
        lat: 40123456,
        lng: -74321567,
        price: 300,
        ownerId: 3
      },
      {
        address: "789 Oak St",
        city: "Smalltown",
        state: "TX",
        country: "USA",
        name: "Rustic Ranch",
        description: "Cozy rural getaway with horseback riding trails",
        lat: 32165478,
        lng: -98123456,
        price: 250,
        ownerId: 3
      },
      {
        address: "321 Pine St",
        city: "Beachtown",
        state: "FL",
        country: "USA",
        name: "Oceanfront Oasis",
        description: "Luxurious beachside villa with private pool",
        lat: 27894321,
        lng: -80213456,
        price: 400,
        ownerId: 3
      },
      {
        address: "901 Maple St",
        city: "Hilltown",
        state: "CO",
        country: "USA",
        name: "Mountain Retreat",
        description: "Cozy cabin with stunning mountain views",
        lat: 39123456,
        lng: -10567890,
        price: 350,
        ownerId: 3
      },
      {
        address: "1111 Cedar St",
        city: "Laketown",
        state: "MN",
        country: "USA",
        name: "Lakefront Getaway",
        description: "Spacious lakehouse with private dock",
        lat: 46123456,
        lng: -93214567,
        price: 450,
        ownerId: 3
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['testSpot1', 'testSpot2'] }
    }, {});
  }
};