"use strict";

const http               = require('http');
const express            = require('express');

const RemoteTCPFeedRelay = require('./lib/static');
const app                = express();



  //public website
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor/dist'));

const server  = http.createServer(app);

var source = {
  width     : 480,
  height    : 270,

  video_path     : "samples/admiral.264",
  video_duration : 58,
};


source = {
  width     : 800,
  height    : 384,

  video_path     : "/var/local/lib/afm/applications/sdl_usb/5.0/htdocs/storage/video_stream_pipe",
  video_duration : 58,
};
//  video_path     : "/home/nedl/workspaces/git/build/bin/storage/video_stream_pipe",




const feed    = new RemoteTCPFeedRelay(server, source);


server.listen(8080);




