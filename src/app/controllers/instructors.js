const Intl = require("intl");
const { age, date } = require("../../lib/utils");

const fs = require("fs");
const data = require("../../../data.json");

const searchInstructor = (id) => {
  let index = 0;
  let instructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id == id) {
      index = foundIndex;
      return true;
    }
  });

  return { instructor, index };
};

const messages = {
  NOT_FOUND: "Instructor not found!",
  EMPTY_FIELD: "Please, fill all fields",
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
      if (req.body[key] === "") return res.send(messages.EMPTY_FIELD);
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

    let { instructor } = searchInstructor(id);

    if (!instructor) return res.send(messages.NOT_FOUND);

    instructor = {
      ...instructor,
      birth: date(instructor.birth).iso,
    };

    return res.render("instructors/edit", { instructor });
  },

  put(req, res) {
    const { id } = req.body;

    let { instructor, index } = searchInstructor(id);

    if (!instructor) return res.send(messages.NOT_FOUND);

    instructor = {
      ...instructor,
      ...req.body,
      birth: Date.parse(req.body.birth),
    };

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (error) {
      if (error) res.send("Write file error");

      return res.redirect(`/instructors/${id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    const filteredInstructors = data.instructors.filter(
      (instructor) => instructor.id != id
    );

    console.log(filteredInstructors);
    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (error) {
      if (error) res.send("Write file error");

      return res.redirect("/instructors");
    });
  },
};
