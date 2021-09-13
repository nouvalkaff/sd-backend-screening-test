"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.movie_casts, {
        foreignKey: "cast_id",
      });
    }
  }
  Cast.init(
    {
      name: DataTypes.STRING(100),
      birthday: DataTypes.DATE,
      deadday: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "casts",
      tableName: "casts",
    }
  );
  return Cast;
};
