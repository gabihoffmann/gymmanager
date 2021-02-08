const Intl = require("intl");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const instructors = data.instructors.map(
      (instructor) =>
        (instructor = {
          ...instructor,
          services: instructor.services.split(","),
        })
    );

    return res.render("instructors/index", { instructors });
  },

  create(req, res) {
    res.render("instructors/create");
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] === "") return res.send("Please, fill all fields");
    }

    let { avatarUrl, name, birth, gender, services } = req.body;

    return res.send(req.body);
  },

  show(req, res) {
    return;
  },

  edit(req, res) {
    return;
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] === "") return res.send("Please, fill all fields");
    }

    let { avatarUrl, name, birth, gender, services } = req.body;

    return;
  },

  delete(req, res) {
    return;
  },
};
