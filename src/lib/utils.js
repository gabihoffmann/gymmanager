module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthday = new Date(timestamp);

    let age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month == 0 && today.getDate() <= birthday.getDate())) {
      age--;
    }

    return age;
  },

  date(timestamp) {
    const date = new Date(timestamp);
    //yyyy
    const year = date.getUTCFullYear();
    // mm
    // remember month return 0 to 11, so add 1
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
    };
  },

  blood(type) {
    let rh = type[type.length - 1];
    let blood = type.slice(0, type.length - 1);

    rh == 1 ? (rh = "+") : (rh = "-");

    return blood + rh;
  },
};
