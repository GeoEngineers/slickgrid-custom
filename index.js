/**
 * Main script to build an NPM version of SlickGrid.
 *
 * After install, the Slick.* objects should be available to implementors.
 * @at88mph 2017.04.06
 */

(function(window)
{
  this.jQuery = require('jquery');

  require('./lib/jquery.event.drag-2.3.0');
  require('./lib/jquery.event.drop-2.3.0');

  require('./slick.core');
  require('./slick.groupitemmetadataprovider');
  require('./slick.editors');
  require('./slick.dataview');
  require('./slick.grid');

  module.exports.Slick = window.Slick;
})(window);
