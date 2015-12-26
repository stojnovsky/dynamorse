/* Copyright 2015 Christine S. MacNeill

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by appli cable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var H = require('highland');
var pcap = require('../valve/pcapInlet.js');
var rtp = require('../pipeline/rtpPacketLine.js');
var extract = require('../pipeline/extractRTPPayload.js');
var fileOut = require('../spigot/fileSpigot.js');

var audioSource = '/Volumes/Ormiscraid/media/streampunk/examples/rtp-audio-l24-2chan-wav.pcap';

pcap(audioSource).through(rtp()).through(extract()).pipe(fileOut('out.pcm'));
