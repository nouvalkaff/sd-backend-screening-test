const { movies, movie_casts, casts } = require("../../database/models");

exports.createMovie = async (req, res) => {
  try {
    const { name, language, status, rating } = req.body;

    if (name == "" || language == "" || status == "" || rating == "")
      return res.status(400).json({
        code: 400,
        statustext: "Bad Request",
        success: false,
        message: "Please fill all data",
      });

    const checkMV = await movies.findOne({
      where: { name },
    });

    if (checkMV)
      return res.status(409).json({
        code: 409,
        statustext: "Conflict",
        success: false,
        message: "Same movie data already exist",
      });

    const data = await movies.create({ ...req.body });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: "A new movie data has been created",
      result: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to create a new movie data",
    });
  }
};

exports.getAllMV = async (req, res) => {
  try {
    const allMV = await movies.findAll({
      include: {
        model: movie_casts,
        required: true,
        include: [
          {
            model: casts,
            required: true,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "movie_id", "cast_id"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Successfully getting you all movie data",
      result: allMV,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to show you all movie data",
    });
  }
};

exports.getOneMV = async (req, res) => {
  try {
    const id = req.params.id;
    const oneMV = await movies.findOne({
      include: {
        model: movie_casts,
        required: true,
        include: [
          {
            model: casts,
            required: true,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "movie_id", "cast_id"],
        },
      },
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Successfully get one movie data",
      result: oneMV,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to show you a movie data",
    });
  }
};

exports.updateMV = async (req, res) => {
  try {
    const id = req.params.id;
    const findMV = await movies.findOne({
      where: {
        id: id,
      },
    });

    await movies.update({ ...req.body }, { where: { id: id } });

    const updMV = await movies.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: "Movie data succesfully updated",
      result_update: updMV,
      result_previous: findMV,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to update a movie data",
    });
  }
};

exports.deleteMV = async (req, res) => {
  try {
    const id = req.params.id;

    const findMV = await movies.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const MV = findMV.dataValues.name;

    if (!findMV)
      return res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: `The movie with ID ${id} is not found`,
      });

    await movies.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: `The movie ID ${id} with name '${MV}' is deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to delete a movie data",
    });
  }
};
