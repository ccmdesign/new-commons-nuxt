const fs = require("fs");
const { rimraf } = require('rimraf');
const common = require ("./common");


const stripLineBreaks = (value, replaceWith = '') => {
  if (typeof value !== 'string') return value
  return value.replace(/\r?\n/g, replaceWith)
}

const extractFilePayload = (maybeFile) => {
  if (!maybeFile) return null

  if (typeof maybeFile === 'string') {
    return { id: maybeFile }
  }

  if (Array.isArray(maybeFile)) {
    for (const candidate of maybeFile) {
      const resolved = extractFilePayload(candidate)
      if (resolved) return resolved
    }
    return null
  }

  if (typeof maybeFile === 'object') {
    if (maybeFile.id && typeof maybeFile.id === 'string' && (maybeFile.filename_disk || maybeFile.filename_download)) {
      return maybeFile
    }

    if (maybeFile.directus_files_id) {
      return extractFilePayload(maybeFile.directus_files_id)
    }

    if (maybeFile.files_id) {
      return extractFilePayload(maybeFile.files_id)
    }

    if (maybeFile.file) {
      return extractFilePayload(maybeFile.file)
    }

    if (maybeFile.image) {
      return extractFilePayload(maybeFile.image)
    }

    if (maybeFile.asset) {
      return extractFilePayload(maybeFile.asset)
    }

    // Search nested properties
    for (const value of Object.values(maybeFile)) {
      const resolved = extractFilePayload(value)
      if (resolved) return resolved
    }
  }

  return null
}

const normalizeGallery = (gallery = []) => {
  if (!Array.isArray(gallery)) return []

  return gallery
    .map((entry) => {
      if (!entry) return null

      const file = extractFilePayload(entry)
      if (!file?.id) return null

      const src = common.getImage(file.id)
      const altSource = entry?.alt || entry?.caption || entry?.title || file?.description || file?.title
      const alt = typeof altSource === 'string' ? stripLineBreaks(altSource, ' ') : ''

      return alt ? { src, alt } : { src }
    })
    .filter(Boolean)
}

const objectContructor = async (dir, fs) => {

const winners = await common.getDirectusData("new_commons_winners", [
    'winner_images.*',
    'winner_images.directus_files_id.*'
  ]);

  await winners.data.forEach((item) => {
    let i = { ...item };
    i.slug = item.title ? common.slugify(item.title) : common.slugify(item.applicant);
    if (item.image) {
      const imageId = typeof item.image === 'string' ? item.image : item.image?.id
      i.image = imageId ? common.getImage(imageId) : ''
    } else {
      i.image = ''
    }
    if (typeof item.description === 'string') {
      i.description = stripLineBreaks(item.description);
    }
    if (typeof item.short_description === 'string') {
      i.short_description = stripLineBreaks(item.short_description.trim(), ' ');
    }
    delete i.gallery;
    delete i.winner_images;
    delete i.files;
    const gallery = normalizeGallery(item.winner_images || item.gallery)
    if (gallery.length) {
      i.winner_images = gallery
      i.files = gallery
    }

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING WINNERS: ", i.slug + ".json");
  });
}

const getWinners = async () => {
  
  const dir = "./content/winners";
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
  getWinners
}
