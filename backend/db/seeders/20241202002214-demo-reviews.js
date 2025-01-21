'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'This spot is amazing!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'I had a great time here!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'The view from this spot is incredible!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This spot is so peaceful!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: 'I loved the private pool!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: 'The mountain views are breathtaking!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'This spot is perfect for a family vacation!',
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: 'I had a great time at this spot!',
        stars: 4
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};