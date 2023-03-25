'use strict';
const { v4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hobbies = [
      'camping',
      'climbing',
      'swimming',
      'cycling',
      'cities',
      'fishing',
      'mountain biking',
      'photography',
      'snowboarding',
      'snowshoeing',
      'surfing',
      'safaris',
      'road cycling',
      'caving',
    ]

    await queryInterface.bulkInsert('Hobbies', hobbies.map(hobby => ({
      id: v4(),
      name: hobby
    })))
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Hobbies', null, {})
  }
};
