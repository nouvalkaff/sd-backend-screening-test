"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.movie_casts, {
        foreignKey: "movie_id",
      });
    }
  }
  Movie.init(
    {
      name: DataTypes.STRING(100),
      language: DataTypes.STRING(30),
      status: DataTypes.STRING(10),
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies",
      tableName: "movies",
    }
  );
  return Movie;
};
