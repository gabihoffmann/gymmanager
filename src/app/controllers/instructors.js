const Intl = require("intl");
const { age, date } = require("../../lib/utils");

const fs = require("fs");
const data = require("../../../data.json");

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

    data.instructors.push({
      id: Number(data.instructors.length + 1),
      avatarUrl,
      name,
      birth: Date.parse(birth),
      gender,
      services,
      created_at: Date.now(),
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (error) {
      if (error) res.send("Write file error!");

      return res.redirect("/instructors");
    });
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
