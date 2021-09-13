"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.movies, {
        foreignKey: "movie_id",
      }),
        this.belongsTo(models.casts, { foreignKey: "cast_id" });
    }
  }
  Movie_Cast.init(
    {
      movie_id: {
        type: DataTypes.BIGINT,
        foreignKey: true,
      },
      cast_id: {
        type: DataTypes.BIGINT,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: "movie_casts",
      tableName: "movie_casts",
    }
  );
  return Movie_Cast;
};
