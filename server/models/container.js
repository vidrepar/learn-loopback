'use strict';

module.exports = function (container) {
  container.uploadFile = function (req, res, containerName, name) {
    return new Promise(function (resolve, reject) {
      var options = {
        container: containerName,
        getFilename: function (fileInfo, req, res) {
          return name;
        },
      };

      container.getContainers(function (err, containers) {
        if (containers.some(function (e) {
            return e.name == containerName;
        })) {
          console.log('test 3');
          container.upload(req, res, options, function (err, done) {
            console.log('test 4');
            if (err) return reject(err);
            resolve(done);
          });
        } else {
          container.createContainer({name: containerName}, function (err, c) {
            if (err) return reject(err);

            container.upload(req, res, options, function (err, done) {
              if (err) return reject(err);
              resolve(done);
            });
          });
        }
      });
    });
  };
};
