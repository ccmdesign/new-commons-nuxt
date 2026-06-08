const fs = require("fs");
const { rimraf } = require('rimraf');
const common = require("./common");


const objectContructor = async (dir, fs) => {

  let items;
  try {
    items = await common.getDirectusData("new_commons_people");
  } catch (err) {
    console.log("Warning: Could not fetch people from Directus:", err.message || err);
    console.log("Skipping people import. Existing content files will be used if available.");
    return;
  }

  items.data.forEach((item) => {
    let i = {};
    i.name = item.name;
    i.slug = common.slugify(item.name);
    i.description = item.description || '';
    i.type = item.type || '';
    i.bio = item.bio || '';
    i.profile_url = item.profile_url || '';
    i.img = item.photo ? common.getImage(item.photo.id) : '';

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING PERSON: ", i.slug + ".json");
  });
}

const getPeople = async () => {

  const dir = "./content/people";
  if (fs.existsSync(dir)) {
    Promise.all([rimraf(dir)]).then(() => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await objectContructor(dir, fs);
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dir);
    fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await objectContructor(dir, fs);
      }
    });
  }
}

module.exports = {
  getPeople
}
