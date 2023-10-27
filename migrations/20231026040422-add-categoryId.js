"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "CategoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "CategoryId", {
      /* query options */
    });
  },
};
