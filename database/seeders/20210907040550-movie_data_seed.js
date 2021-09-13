"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("movies", [
      {
        id: 1,
        name: "The Shawshank Redemption",
        language: "english",
        status: "ended",
        rating: 5,
      },
      {
        id: 2,
        name: "The Godfather",
        language: "english",
        status: "ended",
        rating: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("movies", null, {});
  },
};
