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
    await queryInterface.createTable('Trips', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(20),
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      numberMembers: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      timeEnd: {
        type: Sequelize.DataTypes.DATE
      },
      timeStart: {
        type: Sequelize.DataTypes.DATE
      },
      meetingLng: {
        type: Sequelize.DataTypes.STRING
      },
      meetingLat: {
        type: Sequelize.DataTypes.STRING
      },
      slot: {
        type: Sequelize.DataTypes.INTEGER
      },
      joined: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      locationStartId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Locations',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      locationEndId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Locations',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      hostId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Accounts',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Trips')
  }
};
