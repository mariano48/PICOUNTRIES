const { DataTypes, ARRAY } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.ENUM(
          "Asia",
          "Europe",
          "North America",
          "South America",
          "Oceania",
          "Antarctica",
          "Africa"
        ),
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get() {
          const value = `${this.getDataValue("area").toLocaleString()} km2`;
          return value;
        },
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get() {
          const valueFixed = `${this.getDataValue(
            "population"
          ).toLocaleString()} people`;
          return valueFixed;
        },
      },
    },
    { timestamps: false }
  );
};
