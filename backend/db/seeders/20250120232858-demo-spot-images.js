'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/4258279/pexels-photo-4258279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://example.com/spot2-2.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://example.com/spot3-2.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://example.com/spot4-2.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://example.com/spot5-2.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://example.com/spot6-2.jpg',
        preview: false
      },
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
