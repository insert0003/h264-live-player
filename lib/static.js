"use strict";

const fs           = require('fs');
const Throttle     = require('stream-throttle').Throttle;
const merge        = require('mout/object/merge');

const Server       = require('./_server');

class StaticFeed extends Server {

  constructor(server, opts) {
    super(server, merge({
      video_path     : null,
      video_duration : 0,
    }, opts));
  }

  get_feed() {
    var source = this.options.video_path;

      //throttle for "real time simulation"
    var sourceThrottleRate = Math.floor(fs.statSync(source)['size'] / this.options.video_duration);
//    if(sourceThrottleRate == 0) {
//        sourceThrottleRate = 51*1024;
//    }
    console.log("Generate a throttle rate of %s kBps", Math.floor(sourceThrottleRate/1024));

//    var readStream = fs.createReadStream(source);
//    readStream = readStream.pipe(new Throttle({rate: 51*1024}));

    var readStream = fs.createReadStream(source);
    readStream = readStream.pipe(new Throttle({rate: 52224})); //52224

//    var readStream = fs.createReadStream(source);
    //readStream = readStream.pipe();

    console.log("Generate a static feed from ", source);
    return readStream;
  }

}




module.exports = StaticFeed;
