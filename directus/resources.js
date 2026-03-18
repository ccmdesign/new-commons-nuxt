const fs = require("fs");
const { rimraf } = require('rimraf');
const common = require("./common");


const objectContructor = async (dir, fs) => {

  const items = await common.getDirectusData("new_commons_resources");

  items.data.forEach((item) => {
    let i = {};
    i.title = item.title;
    i.slug = common.slugify(item.title);
    i.description = item.description || '';
    i.category = item.category || '';
    i.url = item.url || '';
    i.file = item.file ? common.getImage(item.file.id) : '';
    i.cover_image = item.cover_image ? common.getImage(item.cover_image.id) : '';

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING RESOURCE: ", i.slug + ".json");
  });
}

const getResources = async () => {

  const dir = "./content/resources";
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
        objectContructor(dir, fs);
      }
    });
  }
}

module.exports = {
  getResources
}
