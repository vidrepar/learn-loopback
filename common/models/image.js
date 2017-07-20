'use strict';

module.exports = function(Image) {

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function(Error, object)} cb
   */

  Image.upload = function(req, res, cb) {
    let container = Image.app.models.container;
    let containerName = 'images';

    let name = Math.floor(Math.random() * 9999999) + '.jpg';

    console.log('test');

    // Save file
    container.uploadFile(req, res, containerName, name)
    .then((done) => {
      console.log('test 2');
      return Image.create({
        container: `${containerName}/${name}`
      });
    })
    .then(image => {
      cb(null, image);
    })
    .catch(cb);
  };

};
