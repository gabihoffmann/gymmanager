const Intl = require("intl");
const { age, date } = require("../../lib/utils");

const fs = require("fs");
const data = require("../../../data.json");

const searchInstructor = (id) =>
  data.instructors.find((instructor) => instructor.id == id);

const messages = {
  NOT_FOUND: "Instructor not found!",
};

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
    const { id } = req.params;

    let instructor = data.instructors.find((instructor) => instructor.id == id);

    if (!instructor) return res.send(`Instructor not found!`);

    instructor = {
      ...instructor,
      age: age(instructor.birth),
      services: instructor.services.split(","),
      created_at: Intl.DateTimeFormat("pt-BR").format(instructor.created_at),
    };

    return res.render("instructors/show", { instructor });
  },

  edit(req, res) {
    const { id } = req.params;

    let instructor = searchInstructor(id);

    if (!instructor) return res.send(messages.NOT_FOUND);

    return res.render("instructors/edit", { instructor });
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
