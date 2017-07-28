'use strict';

module.exports = function(Image) {
  Image.validatesPresenceOf('accountId');
  Image.validatesPresenceOf('status');
  Image.validatesInclusionOf('status', {'in': ['processing', 'done']});

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

    console.log(req);
    // Save file
    container.uploadFile(req, res, containerName, name)
    .then((done) => {
      return Image.create({
        name,
        accountId: req.accessToken.userId,
      });
    })
    .then(image => {
      cb(null, image);
    })
    .catch(cb);
  };
};
