'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Locations', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(20)
      },
      address: {
        type: Sequelize.DataTypes.TEXT
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      lng: {
        type: Sequelize.DataTypes.STRING
      },
      lat: {
        type: Sequelize.DataTypes.STRING
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['enable', 'disable', 'pending'],
        defaultValue: 'enable'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Locations')
  }
};
