const fs = require("fs");
const { rimraf } = require('rimraf');
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const items = await common.getDirectusData("new_commons_blogposts");

  await items.data.forEach((item) => {
    let i = {};
    i.date = item.date;
    i.slug = common.slugify(item.heading);
    i.heading = item.heading;
    i.brow = item.brow;
    i.tagline = item.tagline;
    i.main_content = item.main_content;
    i.cover_image = item.image ? common.getImage(item.image.id) : '';

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING BLOGPOST: ", i.slug + ".json");
  });
}

const getBlogposts = async () => {
  
  const dir = "./content/blogposts";
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
  getBlogposts
}
