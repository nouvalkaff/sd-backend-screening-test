"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("movie_casts", [
      {
        id: 1,
        movie_id: 1,
        cast_id: 1,
      },
      {
        id: 2,
        movie_id: 1,
        cast_id: 2,
      },
      {
        id: 3,
        movie_id: 1,
        cast_id: 3,
      },
      {
        id: 4,
        movie_id: 2,
        cast_id: 4,
      },
      {
        id: 5,
        movie_id: 2,
        cast_id: 5,
      },
      {
        id: 6,
        movie_id: 2,
        cast_id: 6,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("movie_cast", null, {});
  },
};
