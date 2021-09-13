const { movies, movie_casts, casts } = require("../../database/models");

exports.createCast = async (req, res) => {
  try {
    const { name, birthday, rating, deadday } = req.body;

    if (name == "" || birthday == "" || rating == "")
      return res.status(400).json({
        code: 400,
        statustext: "Bad Request",
        success: false,
        message: "Please fill all data",
      });

    const checkCast = await casts.findOne({
      where: { name },
    });

    if (checkCast)
      return res.status(409).json({
        code: 409,
        statustext: "Conflict",
        success: false,
        message: "Same cast data already exist",
      });

    const data = await casts.create({ ...req.body });

    const getCA = await casts.findOne({ where: { name } }),
      getCAID = await getCA.dataValues.id;

    await movie_casts.create({ movie_id: req.body.movie_id, cast_id: getCAID });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: "A new cast data has been created",
      result: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to create a new cast data",
    });
  }
};

exports.getAllCast = async (req, res) => {
  try {
    const allCA = await casts.findAll({
      include: {
        model: movie_casts,
        required: true,
        include: [
          {
            model: movies,
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
      message: "Successfully getting you all cast data",
      result: allCA,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to show you all cast data",
    });
  }
};

exports.getOneCast = async (req, res) => {
  try {
    const id = req.params.id;
    const oneCA = await casts.findOne({
      include: {
        model: movie_casts,
        required: true,
        include: [
          {
            model: movies,
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
      message: "Successfully get one cast data",
      result: oneCA,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to show you a cast data",
    });
  }
};

exports.updateCast = async (req, res) => {
  try {
    const id = req.params.id;
    const findCA = await casts.findOne({
      where: {
        id: id,
      },
    });

    await casts.update({ ...req.body }, { where: { id: id } });

    const updCA = await casts.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: "Cast data succesfully updated",
      result_update: updCA,
      result_previous: findCA,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to update a cast data",
    });
  }
};

exports.deleteCast = async (req, res) => {
  try {
    const id = req.params.id;

    const findCA = await casts.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const CA = findCA.dataValues.name;

    if (!findCA)
      return res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: `The cast with ID ${id} is not found`,
      });

    await casts.destroy({
      where: {
        id: id,
      },
    });

    await movie_casts.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      code: 200,
      statustext: "OK",
      success: true,
      message: `The cast ID ${id} with name '${CA}' is deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Sorry, we failed to delete a cast data",
    });
  }
};
