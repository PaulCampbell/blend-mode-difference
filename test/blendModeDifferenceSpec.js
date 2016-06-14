const blendModeDifference = require('../blendModeDifference.js');
const fs = require('fs');
const jpeg = require('jpeg-js');
const Jimp = require('jimp');
const expect = require('chai').expect;

describe('blend mode difference', function() {
  it('returns data of the difference between the images', function() {
    const beerData = fs.readFileSync('./test/beer.jpg');
    const noBeerData = fs.readFileSync('./test/no_beer.jpg');
    const rawBeerData = jpeg.decode(beerData);
    const rawNoBeerData = jpeg.decode(noBeerData);

    const blendedImageData = blendModeDifference(rawBeerData.data, rawNoBeerData.data);
    const blendedJpg = jpeg.encode({width: 1200, height: 1600, data: blendedImageData}, 50);
    const beerBottlePart = { x: 970, y: 150, width: 40, height: 90 };
    const bottomPart = { x: 460, y: 1350, width: 40, height: 40 };

    getAvarageColourDiff(blendedJpg, beerBottlePart, function(avarage) {
      expect(avarage < 10).to.eql(true);
    })
    getAvarageColourDiff(blendedJpg, bottomPart, function(avarage) {
      expect(avarage > 30).to.eql(true);
    });

  });

  function getAvarageColourDiff(jpg, imagePart, next) {
    Jimp.read(jpg.data, function (err, image) {
      image.crop(imagePart.x, imagePart.y, imagePart.width, imagePart.height );
      var i = 0;
      var average = 0;
      while (i < (image.bitmap.data.length * 0.25)) {
        average += (image.bitmap.data[i * 4] + image.bitmap.data[i * 4 + 1] + image.bitmap.data[i * 4 + 2]) / 3;
        ++i;
      }
      average = Math.round(average / (image.bitmap.data.length * 0.25));
      next(average);
    });
  }
})
