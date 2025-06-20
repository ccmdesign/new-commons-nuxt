require('dotenv').config();
const { Directus } = require('@directus/sdk');

const CONTENT_STATUS = process.env.DEV ? JSON.parse(process.env.DEV) : ["published"]
const directus = new Directus(process.env.BASE_URL);
const API_KEY = process.env.API_KEY;

// get content from directus
const getDirectusData = async (collectionName, junctionFields=undefined) => {
  const content = await directus.items(collectionName).readByQuery({
    fields: junctionFields ? [`*.*`, ...junctionFields] : ['*.*'],
    limit: -1,
    filter: {
      "status": {
        "_in" : CONTENT_STATUS
      }
    }
  });

  return content;
}

// getImageUrl
const getImage = (imageId) => {
  return `${ process.env.BASE_URL }/assets/${ imageId }`;
}

const getYTVideoID = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const id = match && match[7].length == 11 ? match[7] : false;

  return id;
};

const getVideoThumbnail = async (url) => {
  const videoId = getYTVideoID(url);
  const thumbsValues = {};

  //const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
  const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

  const response = await fetch(API_URL).catch((err) =>
    console.log(`Error trying to get thumbnails for videos "${videoId}": ${err}`)
  );

  const json = await response.json();

  for (let item of json.items) {
    const thumbs = item.snippet.thumbnails;

    if (thumbs.maxres) {
      return thumbs.maxres.url;
    } else if (thumbs.standard) {
      return thumbs.standard.url;
    } else if (thumbs.high) {
      return thumbs.high.url;
    } else if (thumbs.medium) {
      return thumbs.medium.url;
    } else if (thumbs.default) {
      return thumbs.default.url;
    } else {
      return "";
    }
  }

};

// slugify
const slugify = (term) => {
  return term
    .toString()
    .toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a") // Special Characters #1
    .replace(/[èÈéÉêÊëË]+/g, "e") // Special Characters #2
    .replace(/[ìÌíÍîÎïÏ]+/g, "i") // Special Characters #3
    .replace(/[òÒóÓôÔõÕöÖº]+/g, "o") // Special Characters #4
    .replace(/[ùÙúÚûÛüÜ]+/g, "u") // Special Characters #5
    .replace(/[ýÝÿŸ]+/g, "y") // Special Characters #6
    .replace(/[ñÑ]+/g, "n") // Special Characters #7
    .replace(/[çÇ]+/g, "c") // Special Characters #8
    .replace(/[ß]+/g, "ss") // Special Characters #9
    .replace(/[Ææ]+/g, "ae") // Special Characters #10
    .replace(/[Øøœ]+/g, "oe") // Special Characters #11
    .replace(/[%]+/g, "pct") // Special Characters #12
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
}

const formatTime = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleTimeString(
    'en',
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}

const LANGUAGES = {
  "es-ES": "es",
  "en-US": "en",
  "fr-FR": "fr",
  "ar-SA": "ar",
  "zh-CN": "zh",
}

module.exports = {
  getDirectusData,
  getImage,
  slugify,
  formatDate,
  formatTime,
  LANGUAGES,
  getVideoThumbnail
 };