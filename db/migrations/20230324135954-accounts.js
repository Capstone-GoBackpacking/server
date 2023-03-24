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
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: ['enable', 'disable', 'pending'],
        defaultValue: 'enable'
      },
      roleId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Roles',
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
    await queryInterface.dropTable('Accounts')
  }
};
