const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 365,
        },
        get() {
          const difficultyFormatted = `${this.getDataValue(`duration`)} days`;
          return difficultyFormatted;
        },
      },
      season: {
        type: DataTypes.ENUM("summer", "fall", "winter", "spring"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
