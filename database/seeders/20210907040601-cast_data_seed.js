"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("casts", [
      {
        id: 1,
        name: "Tim Robbins",
        birthday: "1958-10-16",
        deadday: null,
        rating: 4,
      },
      {
        id: 2,
        name: "Morgan Freeman",
        birthday: "1937-06-01",
        deadday: null,
        rating: 5,
      },
      {
        id: 3,
        name: "Bob Gunton",
        birthday: "1945-11-15",
        deadday: null,
        rating: 4,
      },
      {
        id: 4,
        name: "Al Pacino",
        birthday: "1940-04-25",
        deadday: null,
        rating: 5,
      },
      {
        id: 5,
        name: "Marlon Brando",
        birthday: "1924-04-03",
        deadday: "2004-07-01",
        rating: 4,
      },
      {
        id: 6,
        name: "James Caan",
        birthday: "1940-03-26",
        deadday: null,
        rating: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("casts", null, {});
  },
};
