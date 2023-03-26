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
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.DataTypes.STRING(30),
      },
      content: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true
      },
      time: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      authorId: {
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
    await queryInterface.dropTable('Posts')
  }
};
