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

var test = require('tape');
var RFC4175Packet = require('../model/RFC4175Packet.js');

var packet0 = new Buffer([144,96,211,94,3,226,118,253,90,13,163,44,190,222,0,19,25,0,0,86,13,98,53,30,254,146,0,63,41,253,247,205,234,238,68,159,186,23,143,227,85,8,241,104,79,121,58,115,58,112,239,78,31,163,150,218,27,203,19,2,25,80,160,39,1,7,4,0,4,9,9,3,121,0,0,86,13,98,53,30,254,146,0,151,0,0,0,1,0,0,0,25,105,43,5,70,0,21,0,0,128,32,8,2,0,128,32,200,1,228,128,34,72,1,204,128,35,200,1,180,128,38,8,1,140,128,40,136,1,92,128,43,136,1,48,128,47,8,0,248,128,50,72,0,196,128,53,72,0,140,128,56,136,0,92,128,59,200,0,48,128,62,8,0,12,128,63,136,0,0,128,63,200,0,4,128,63,8,0,32,128,60,8,0,84,128,56,8,0,168,128,49,200,1,24,128,42,200,1,156,128,33,136,2,48,128,24,8,2,192,128,15,136,3,68,128,7,200,3,180,128,2,8,3,240,128,0,8,3,248,128,1,136,3,188,128,7,72,3,68,128,16,200,2,148,128,28,200,1,204,128,42,8,1,0,128,53,72,0,92,128,61,136,0,4,128,63,200,0,16,128,59,200,0,132,128,49,200,1,80,128,35,8,2,72,128,19,200,3,56,128,6,200,3,216,128,0,8,3,252,128,2,136,3,136,128,13,136,2,172,128,30,72,1,128,128,48,72,0,132,128,60,200,0,4,128,63,136,0,52,128,54,136,1,12,128,37,72,2,72,128,16,200,3,112,128,3,8,3,252,128,0,200,3,176,128,12,72,2,148,128,33,136,1,60,128,54,8,0,52,128,63,200,0,16,128,57,136,0,236,128,37,72,2,96,128,14,8,3,160,128,0,200,3,248,128,4,200,3,36,128,25,200,1,156,128,50,72,0,72,128,63,200,0,20,128,56,8,1,36,128,32,8,2,204,128,7,200,3,236,128,0,72,3,160,128,16,8,2,36,128,44,8,0,132,128,62,200,0,8,128,57,8,1,36,128,30,72,2,252,128,4,200,3,252,128,2,72,3,68,128,25,200,1,104,128,55,8,0,16,128,63,8,0,140,128,42,8,2,96,128,10,136,3,228,128,0,136,3,120,128,22,136,1,140,128,54,8,0,16,128,62,136,0,168,128,38,8,2,184,128,6,72,3,252,128,3,200,2,252,128,33,136,0,216,128,61,200,0,12,128,54,8,1,156,128,19,8,3,176,128,0,8,3,152,128,21,8,1,116,128,56,136,0,0,128,59,72,1,48,128,24,200,3,120,128,0,8,3,180,128,19,200,1,128,128,56,136,0,0,128,58,8,1,92,128,21,8,3,176,128,0,8,3,112,128,27,72,0,248,128,61,200,0,24,128,49,8,2,48,128,8,200,3,252,128,5,200,2,136,128,45,136,0,40,128,62,136,0,236,128,27,72,3,128,128,0,8,3,120,128,28,200,0,216,128,63,8,0,64,128,41,72,2,216,128,2,72,3,220,128,18,72,1,104,128,59,200,0,16,128,48,72,2,112,128,4,200,3,244,128,14,8,1,156,128,58,136,0,8,128,49,8,2,112,128,4,136,3,240,128,16,8,1,104,128,60,136,0,28,128,44,8,2,204,128,1,136,3,188,128,24,200,0,216,128,63,200,0,124,128,32,8,3,120,128,0,8,3,28,128,40,136,0,48,128,61,72,1,104,128,14,8,3,252,128,8,200,1,216,128,58,8,0,16,128,44,8,2,240,128,0,72,3,128,128,33,136,0,92,128,62,136,1,68,128,14,200,3,252,128,10,136,1,156,128,60,136,0,52,128,36,136,3,104,128,0,72,2,228,128,47,8,0,4,128,54,8,2,96,128,2,72,3,176,128,30,72,0,100,128,62,8,1,128,128,10,136,3,248,128,18,72,0,248,128,63,200,0,224,128,19,8,3,248,128,11,8,1,104,128,62,200,0,140,128,25,200,3,224,128,7,72,1,180,128,61,136,0,100,128,28,8,3,212,128,6,72,1,192,128,61,136,0,108,128,27,72,3,220,128,7,200,1,156,128,62,136,0,148,128,22,136,3,244,128,11,136,1,48,128,63,200,0,248,128,14,200,3,252,128,20,72,0,168,128,62,200,1,156,128,6,72,3,192,128,33,136,0,36,128,55,136,2,148,128,0,72,3,16,128,49,200,0,4,128,40,136,3,136,128,3,200,1,216,128,62,8,0,168,128,18,72,3,252,128,20,72,0,132,128,60,200,2,24,128,1,136,3,76,128,47,8,0,0,128,39,200,3,160,128,5,200,1,128,128,63,200,1,24,128,9,200,3,212,128,34,72,0,16,128,49,200,3,48,128,1,136,2,0,128,62,72,0,204,128,13,136,3,232,128,32,8,0,24,128,50,72,3,56,128,2,8,1,216,128,63,8,1,0,128,9,72,3,192,128,39,8,0,0,128,42,8,3,168,128,8,72,1,24,128,63,8,1,228,128,1,72,3,4,128,54,136,0,72,128,21,200,3,252,128,27,72,0,32,128,50,72,3,84,128,4,136,1,92,128,63,200,1,204,128,1,72,2,252,128,56,8,0,108,128,16,200,3,232,128,35,8,0,0,128,39,200,3,212,128,14,8,0,140,128,57,136,2,228,128,1,136,1,168,128,63,200,1,180,128,1,8,2,204,128,59,8,0,184,128,10,136,3,160,128,47,8,0,32,128,24,8,3,252,128,32,200,0,0,128,38,8,3,232,128,19,200,0,60,128,49,200,3,136,128,9,200,0,176,128,57,136,3,16,128,3,200,1,48,128,62,8,2,148,128,0,200,1,168,128,63,200,2,24,128,0,8,2,12,128,63,200,1,192,128,0,72,2,84,128,63,72,1,140,128,0,200,2,136,128,62,136,1,104,128,1,72,2,160,128,62,72,1,92,128,1,72,2,148,128,62,136,1,116,128,0,200,2,124,128,63,8,1,168,128,0,72,2,60,128,63,200,1,228,128,0,8,1,228,128,63,200,2,72,128,0,200,1,116,128,62,8,2,192,128,3,72,0,248,128,58,8,3,68,128,9,72,0,124,128,50,72,3,188,128,19,8,0,24,128,39,8,3,252,128,32,8,0,0,128,24,200,3,224,128,46,72,0,84,128,11,8,3,84,128,58,136,1,24,128,1,136,2,84,128,63,200,2,60,128,1,72,1,36,128,58,8,3,96,128,12,200,0,52,128,41,72,3,252,128,34,72,0,12,128,18,72,3,152,128,55,8,0,236]);
var packet1 = new Buffer([128,96,211,95,3,226,118,253,90,13,163,44,105,43,5,145,0,21,2,28,128,1,200,2,72,128,63,200,2,136,128,3,200,0,184,128,51,136,3,204,128,25,200,0,0,128,24,8,3,192,128,53,72,0,224,128,1,200,2,48,128,63,136,2,192,128,6,200,0,100,128,43,136,3,252,128,37,72,0,48,128,11,8,3,16,128,62,136,2,0,128,1,72,0,224,128,52,72,3,216,128,29,136,0,12,128,15,136,3,76,128,61,136,1,216,128,0,200,0,236,128,51,136,3,224,128,32,8,0,28,128,11,136,3,4,128,63,72,2,84,128,4,8,0,116,128,42,8,3,252,128,44,200,0,148,128,2,136,2,24,128,62,8,3,84,128,18,72,0,0,128,21,8,3,120,128,60,200,1,240,128,2,72,0,148,128,43,136,3,252,128,47,8,0,196,128,0,200,1,156,128,57,136,3,188,128,29,136,0,36,128,8,72,2,148,128,63,136,3,36,128,16,200,0,0,128,18,72,3,56,128,63,136,2,148,128,9,72,0,24,128,26,136,3,144,128,61,72,2,36,128,5,72,0,60,128,31,8,3,180,128,59,200,2,0,128,4,8,0,72,128,32,8,3,188,128,59,200,2,12,128,4,200,0,52,128,29,136,3,160,128,61,136,2,72,128,7,200,0,20,128,23,72,3,84,128,63,136,2,204,128,14,200,0,0,128,14,8,2,192,128,63,72,3,104,128,26,136,0,40,128,4,136,1,216,128,57,8,3,232,128,42,200,0,216,128,0,8,0,204,128,41,72,3,228,128,58,8,2,12,128,7,72,0,12,128,19,200,2,252,128,63,136,3,112,128,28,200,0,76,128,1,200,1,92,128,49,8,3,252,128,55,8,1,204,128,5,200,0,16,128,19,8,2,216,128,63,8,3,160,128,35,8,0,156,128,0,8,0,196,128,37,72,3,180,128,62,136,2,216,128,19,200,0,28,128,3,200,1,128,128,49,8,3,248,128,57,136,2,60,128,11,136,0,0,128,8,72,1,228,128,54,8,3,252,128,55,8,2,0,128,9,200,0,0,128,8,200,1,240,128,53,72,3,252,128,56,136,2,60,128,12,200,0,4,128,5,72,1,128,128,47,8,3,228,128,61,72,2,204,128,22,136,0,72,128,0,136,0,196,128,33,136,3,104,128,63,200,3,160,128,39,200,1,24,128,2,136,0,20,128,14,8,2,48,128,54,136,3,252,128,59,8,2,160,128,21,8,0,72,128,0,8,0,148,128,28,8,3,4,128,61,136,3,236,128,51,136,2,12,128,13,136,0,24,128,1,136,0,216,128,32,8,3,48,128,62,72,3,232,128,51,136,2,24,128,14,200,0,36,128,0,136,0,156,128,26,136,2,204,128,59,8,3,252,128,58,136,2,192,128,26,136,0,156,128,0,200,0,24,128,11,136,1,192,128,44,200,3,168,128,63,200,3,192,128,47,200,1,240,128,15,136,0,60,128,0,8,0,76,128,16,200,2,24,128,49,8,3,192,128,63,200,3,188,128,48,72,2,24,128,18,72,0,100,128,0,72,0,28,128,10,136,1,128,128,39,8,3,68,128,61,72,3,252,128,59,200,3,28,128,35,200,1,92,128,9,72,0,28,128,0,8,0,72,128,14,8,1,180,128,40,136,3,76,128,60,200,3,252,128,61,136,3,96,128,42,200,1,216,128,17,136,0,116,128,1,72,0,0,128,3,200,0,184,128,22,136,2,36,128,46,72,3,120,128,61,200,3,252,128,61,200,3,120,128,46,72,2,48,128,24,8,0,224,128,6,72,0,20,128,0,8,0,36,128,8,72,1,0,128,25,200,2,72,128,46,72,3,104,128,60,8,3,248,128,63,136,3,204,128,55,136,2,252,128,39,8,1,228,128,21,8,0,204,128,6,200,0,32,128,0,8,0,4,128,3,8,0,124,128,13,136,1,80,128,28,200,2,84,128,44,200,3,56,128,57,8,3,212,128,63,72,3,252,128,62,200,3,192,128,56,8,3,48,128,44,200,2,96,128,32,8,1,140,128,19,8,0,216,128,8,200,0,76,128,2,8,0,4,128,0,8,0,8,128,2,8,0,72,128,7,200,0,184,128,15,136,1,68,128,24,200,1,228,128,35,8,2,124,128,44,8,3,4,128,51,136,3,112,128,57,136,3,188,128,61,200,3,240,128,63,136,3,252,128,63,200,3,244,128,62,136,3,212,128,59,200,3,160,128,56,136,3,104,128,52,72,3,36,128,48,72,2,228,128,44,8,2,160,128,39,200,2,84,128,35,200,2,36,128,32,200,1,228,128,29,136,1,192,128,26,136,1,156,128,24,8,1,116,128,22,136,1,92,128,21,8,1,68,128,20,72,1,60,128,19,200,1,60,128,19,200,1,60,128,19,200,1,60,128,20,72,1,68,128,21,8,1,92,128,22,136,1,116,128,24,8,1,156,128,26,136,1,192,128,29,136,1,228,128,32,200,2,36,128,35,200,2,84,128,39,200,2,160,128,44,8,2,228,128,48,72,3,36,128,52,72,3,104,128,56,136,3,160,128,59,200,3,212,128,62,136,3,244,128,63,200,3,252,128,63,136,3,240,128,61,200,3,188,128,57,136,3,112,128,51,136,3,4,128,44,8,2,124,128,35,8,1,228,128,24,200,1,68,128,15,136,0,184,128,7,200,0,72,128,2,8,0,8,128,0,8,0,4,128,2,8,0,76,128,8,200,0,216,128,19,8,1,140,128,32,8,2,96,128,44,200,3,48,128,56,8,3,192,128,62,200,3,252,128,63,72,3,212,128,57,8,3,56,128,44,200,2,84,128,28,200,1,80,128,13,136,0,124,128,3,8,0,4,128,0,8,0,32,128,6,200,0,204,128,21,8,1,228,128,39,8,2,252,128,55,136,3,204,128,63,136,3,248,128,60,8,3,104,128,46,72,2,72,128,25,200,1,0,128,8,72,0,36,128,0,8,0,20,128,6,72,0,224,128,24,8,2,48,128,46,72,3,120,128,61,200,3,252,128,61,200,3,120,128,46,72,2,36,128,22,136,0,184,128,3,200,0,0,128,1,72,0,116,128,17,136,1,216,128,42,200,3,96,128,61,136,3,252,128,60,200,3,76,128,40,136,1,180,128,14,8,0,72,128,0,8,0,28,128,9,72,1,92,128,35,200,3,28,128,59,200,3,252,128,61,72,3,68,128,39,8,1,128,128,10,136,0,28]);
var packet2 = new Buffer([128,96,211,96,3,226,118,253,90,13,163,44,105,43,5,145,0,21,4,86,128,0,72,0,100,128,18,72,2,24,128,48,72,3,188,128,63,200,3,192,128,49,8,2,24,128,16,200,0,76,128,0,8,0,60,128,15,136,1,240,128,47,200,3,192,128,63,200,3,168,128,44,200,1,192,128,11,136,0,24,128,0,200,0,156,128,26,136,2,192,128,58,136,3,252,128,59,8,2,204,128,26,136,0,156,128,0,136,0,36,128,14,200,2,24,128,51,136,3,232,128,62,72,3,48,128,32,8,0,216,128,1,136,0,24,128,13,136,2,12,128,51,136,3,236,128,61,136,3,4,128,28,8,0,148,128,0,8,0,72,128,21,8,2,160,128,59,8,3,252,128,54,136,2,48,128,14,8,0,20,128,2,136,1,24,128,39,200,3,160,128,63,200,3,104,128,33,136,0,196,128,0,136,0,72,128,22,136,2,204,128,61,72,3,228,128,47,8,1,128,128,5,72,0,4,128,12,200,2,60,128,56,136,3,252,128,53,72,1,240,128,8,200,0,0,128,9,200,2,0,128,55,8,3,252,128,54,8,1,228,128,8,72,0,0,128,11,136,2,60,128,57,136,3,248,128,49,8,1,128,128,3,200,0,28,128,19,200,2,216,128,62,136,3,180,128,37,72,0,196,128,0,8,0,156,128,35,8,3,160,128,63,8,2,216,128,19,8,0,16,128,5,200,1,204,128,55,8,3,252,128,49,8,1,92,128,1,200,0,76,128,28,200,3,112,128,63,136,2,252,128,19,200,0,12,128,7,72,2,12,128,58,8,3,228,128,41,72,0,204,128,0,8,0,216,128,42,200,3,232,128,57,8,1,216,128,4,136,0,40,128,26,136,3,104,128,63,72,2,192,128,14,8,0,0,128,14,200,2,204,128,63,136,3,84,128,23,72,0,20,128,7,200,2,72,128,61,136,3,160,128,29,136,0,52,128,4,200,2,12,128,59,200,3,188,128,32,8,0,72,128,4,8,2,0,128,59,200,3,180,128,31,8,0,60,128,5,72,2,36,128,61,72,3,144,128,26,136,0,24,128,9,72,2,148,128,63,136,3,56,128,18,72,0,0,128,16,200,3,36,128,63,136,2,148,128,8,72,0,36,128,29,136,3,188,128,57,136,1,156,128,0,200,0,196,128,47,8,3,252,128,43,136,0,148,128,2,72,1,240,128,60,200,3,120,128,21,8,0,0,128,18,72,3,84,128,62,8,2,24,128,2,136,0,148,128,44,200,3,252,128,42,8,0,116,128,4,8,2,84,128,63,72,3,4,128,11,136,0,28,128,32,8,3,224,128,51,136,0,236,128,0,200,1,216,128,61,136,3,76,128,15,136,0,12,128,29,136,3,216,128,52,72,0,224,128,1,72,2,0,128,62,136,3,16,128,11,8,0,48,128,37,72,3,252,128,43,136,0,100,128,6,200,2,192,128,63,136,2,48,128,1,200,0,224,128,53,72,3,192,128,24,8,0,0,128,25,200,3,204,128,51,136,0,184,128,3,200,2,136,128,63,200,2,72,128,1,200,0,236,128,55,8,3,152,128,18,72,0,12,128,34,72,3,252,128,41,72,0,52,128,12,200,3,96,128,58,8,1,36,128,1,72,2,60,128,63,200,2,84,128,1,136,1,24,128,58,136,3,84,128,11,8,0,84,128,46,72,3,224,128,24,200,0,0,128,32,8,3,252,128,39,8,0,24,128,19,8,3,188,128,50,72,0,124,128,9,72,3,68,128,58,8,0,248,128,3,72,2,192,128,62,8,1,116,128,0,200,2,72,128,63,200,1,228,128,0,8,1,228,128,63,200,2,60,128,0,72,1,168,128,63,8,2,124,128,0,200,1,116,128,62,136,2,148,128,1,72,1,92,128,62,72,2,160,128,1,72,1,104,128,62,136,2,136,128,0,200,1,140,128,63,72,2,84,128,0,72,1,192,128,63,200,2,12,128,0,8,2,24,128,63,200,1,168,128,0,200,2,148,128,62,8,1,48,128,3,200,3,16,128,57,136,0,176,128,9,200,3,136,128,49,200,0,60,128,19,200,3,232,128,38,8,0,0,128,32,200,3,252,128,24,8,0,32,128,47,8,3,160,128,10,136,0,184,128,59,8,2,204,128,1,8,1,180,128,63,200,1,168,128,1,136,2,228,128,57,136,0,140,128,14,8,3,212,128,39,200,0,0,128,35,8,3,232,128,16,200,0,108,128,56,8,2,252,128,1,72,1,204,128,63,200,1,92,128,4,136,3,84,128,50,72,0,32,128,27,72,3,252,128,21,200,0,72,128,54,136,3,4,128,1,72,1,228,128,63,8,1,24,128,8,72,3,168,128,42,8,0,0,128,39,8,3,192,128,9,72,1,0,128,63,8,1,216,128,2,8,3,56,128,50,72,0,24,128,32,8,3,232,128,13,136,0,204,128,62,72,2,0,128,1,136,3,48,128,49,200,0,16,128,34,72,3,212,128,9,200,1,24,128,63,200,1,128,128,5,200,3,160,128,39,200,0,0,128,47,8,3,76,128,1,136,2,24,128,60,200,0,132,128,20,72,3,252,128,18,72,0,168,128,62,8,1,216,128,3,200,3,136,128,40,136,0,4,128,49,200,3,16,128,0,72,2,148,128,55,136,0,36,128,33,136,3,192,128,6,72,1,156,128,62,200,0,168,128,20,72,3,252,128,14,200,0,248,128,63,200,1,48,128,11,136,3,244,128,22,136,0,148,128,62,136,1,156,128,7,200,3,220,128,27,72,0,108,128,61,136,1,192,128,6,72,3,212,128,28,8,0,100,128,61,136,1,180,128,7,72,3,224,128,25,200,0,140,128,62,200,1,104,128,11,8,3,248,128,19,8,0,224,128,63,200,0,248,128,18,72,3,248,128,10,136,1,128,128,62,8,0,100,128,30,72,3,176,128,2,72,2,96,128,54,8,0,4,128,47,8,2,228,128,0,72,3,104,128,36,136,0,52,128,60,136,1,156,128,10,136,3,252,128,14,200,1,68,128,62,136,0,92,128,33,136,3,128,128,0,72,2,240,128,44,8,0,16,128,58,8,1,216,128,8,200,3,252,128,14,8,1,104,128,61,72,0,48,128,40,136,3,28,128,0,8,3,120,128,32,8,0,124,128,63,200,0,216,128,24,200,3,188,128,1,136,2,204,128,44,8,0,28,128,60,136,1,104,128,16,8,3,240,128,4,136,2,112]);
var packet3 = new Buffer([128,96,211,97,3,226,118,253,90,13,163,44,105,43,2,88,0,21,134,144,3,57,0,22,0,0,128,49,8,0,8,128,58,136,1,156,128,14,8,3,244,128,4,200,2,112,128,48,72,0,16,128,59,200,1,104,128,18,72,3,220,128,2,72,2,216,128,41,72,0,64,128,63,8,0,216,128,28,200,3,120,128,0,8,3,128,128,27,72,0,236,128,62,136,0,40,128,45,136,2,136,128,5,200,3,252,128,8,200,2,48,128,49,8,0,24,128,61,200,0,248,128,27,72,3,112,128,0,8,3,176,128,21,8,1,92,128,58,8,0,0,128,56,136,1,128,128,19,200,3,180,128,0,8,3,120,128,24,200,1,48,128,59,72,0,0,128,56,136,1,116,128,21,8,3,152,128,0,8,3,176,128,19,8,1,156,128,54,8,0,12,128,61,200,0,216,128,33,136,2,252,128,3,200,3,252,128,6,72,2,184,128,38,8,0,168,128,62,136,0,16,128,54,8,1,140,128,22,136,3,120,128,0,136,3,228,128,10,136,2,96,128,42,8,0,140,128,63,8,0,16,128,55,8,1,104,128,25,200,3,68,128,2,72,3,252,128,4,200,2,252,128,30,72,1,36,128,57,8,0,8,128,62,200,0,132,128,44,8,2,36,128,16,8,3,160,128,0,72,3,236,128,7,200,2,204,128,32,8,1,36,128,56,8,0,20,128,63,200,0,72,128,50,72,1,156,128,25,200,3,36,128,4,200,3,248,128,0,200,3,160,128,14,8,2,96,128,37,72,0,236,128,57,136,0,16,128,63,200,0,52,128,54,8,1,60,128,33,136,2,148,128,12,72,3,176,128,0,200,3,252,128,3,8,3,112,128,16,200,2,72,128,37,72,1,12,128,54,136,0,52,128,63,136,0,4,128,60,200,0,132,128,48,72,1,128,128,30,72,2,172,128,13,136,3,136,128,2,136,3,252,128,0,8,3,216,128,6,200,3,56,128,19,200,2,72,128,35,8,1,80,128,49,200,0,132,128,59,200,0,16,128,63,200,0,4,128,61,136,0,92,128,53,72,1,0,128,42,8,1,204,128,28,200,2,148,128,16,200,3,68,128,7,72,3,188,128,1,136,3,248,128,0,8,3,240,128,2,8,3,180,128,7,200,3,68,128,15,136,2,192,128,24,8,2,48,128,33,136,1,156,128,42,200,1,24,128,49,200,0,168,128,56,8,0,84,128,60,8,0,32,128,63,8,0,4,128,63,200,0,0,128,63,136,0,12,128,62,8,0,48,128,59,200,0,92,128,56,136,0,140,128,53,72,0,196,128,50,72,0,248,128,47,8,1,48,128,43,136,1,92,128,40,136,1,140,128,38,8,1,180,128,35,200,1,204,128,34,72,1,228,128,32,200,2,0,128,44,8,1,60,128,43,136,1,80,128,42,8,1,104,128,40,136,1,128,128,38,8,1,168,128,35,200,1,216,128,32,200,2,12,128,28,200,2,72,128,24,200,2,136,128,21,8,2,204,128,16,200,3,16,128,12,72,3,84,128,8,72,3,152,128,4,200,3,200,128,1,200,3,240,128,0,72,3,252,128,0,8,3,244,128,1,136,3,204,128,5,72,3,128,128,10,136,3,28,128,18,72,2,148,128,27,72,2,0,128,36,136,1,104,128,46,72,0,204,128,55,8,0,92,128,61,72,0,12,128,63,200,0,0,128,62,136,0,60,128,56,136,0,184,128,47,8,1,104,128,34,72,2,60,128,21,8,3,16,128,9,72,3,176,128,1,200,3,252,128,0,8,3,224,128,5,72,3,84,128,16,200,2,124,128,32,8,1,116,128,47,200,0,148,128,59,200,0,16,128,63,200,0,20,128,59,8,0,168,128,45,136,1,180,128,27,72,2,216,128,10,136,3,180,128,0,200,3,252,128,2,72,3,136,128,14,200,2,124,128,35,8,1,48,128,53,72,0,60,128,63,136,0,4,128,59,200,0,184,128,42,200,2,0,128,20,72,3,76,128,3,200,3,252,128,0,200,3,160,128,14,200,2,96,128,38,8,0,236,128,58,8,0,12,128,63,136,0,76,128,49,200,1,156,128,24,200,3,48,128,4,8,3,252,128,1,136,3,120,128,19,200,1,240,128,46,72,0,108,128,63,8,0,12,128,57,8,1,24,128,32,8,2,216,128,6,200,3,244,128,1,8,3,120,128,21,8,1,192,128,50,72,0,60,128,63,200,0,60,128,49,200,1,204,128,19,8,3,144,128,0,72,3,220,128,11,8,2,96,128,42,200,0,124,128,63,72,0,28,128,52,72,1,168,128,20,72,3,144,128,0,8,3,204,128,14,8,2,12,128,48,72,0,52,128,63,200,0,108,128,42,200,2,112,128,8,200,3,248,128,2,136,3,28,128,32,200,0,216,128,61,200,0,12,128,53,72,1,192,128,16,200,3,200,128,0,72,3,112,128,26,136,1,36,128,60,8,0,4,128,54,136,1,180,128,16,200,3,204,128,0,200,3,76,128,30,72,0,216,128,62,136,0,32,128,48,72,2,72,128,8,200,3,252,128,5,200,2,148,128,44,200,0,52,128,63,8,0,196,128,30,72,3,96,128,0,8,3,160,128,24,8,1,24,128,61,136,0,28,128,47,8,2,112,128,5,200,3,252,128,11,136,1,228,128,54,136,0,0,128,55,136,1,204,128,12,72,3,252,128,6,72,2,84,128,50,72,0,8,128,58,136,1,156,128,14,8,3,244,128,5,200,2,84,128,51,8,0,4,128,57,8,1,204,128,11,8,3,252,128,9,72,1,240,128,56,8,0,0,128,50,72,2,112,128,4,8,3,228,128,19,200,1,36,128,62,200,0,84,128,35,200,3,84,128,0,8,3,68,128,38,8,0,64,128,61,200,1,92,128,14,200,3,252,128,9,72,1,204,128,59,8,0,24,128,42,200,3,16,128,0,8,3,96,128,37,72,0,60,128,60,200,1,156,128,11,8,3,252,128,15,136,1,60,128,63,8,0,124,128,28,200,3,180,128,2,136,2,96,128,54,136,0,4,128,45,136,3,4,128,0,8,3,48,128,42,200,0,12,128,55,136,2,72,128,2,136,3,168,128,32,200,0,76,128,60,136,1,204,128,6,200,3,220,128,25,200,0,132,128,62,136,1,128,128,9,72,3,240,128,23,72,0,156,128,63,8,1,116,128,9,72,3,236,128,24,8,0,140,128,62,72,1,156,128,7,72,3,216,128,28,200,0,84]);
var packet4 = new Buffer([128,96,211,98,3,226,118,253,90,13,163,44,105,43,5,145,0,22,1,74,128,60,8,2,12,128,3,72,3,152,128,37,72,0,24,128,54,8,2,172,128,0,8,3,28,128,48,72,0,0,128,42,200,3,104,128,1,200,2,48,128,59,72,0,92,128,25,200,3,240,128,12,72,1,12,128,63,200,1,92,128,8,72,3,204,128,33,136,0,32,128,54,8,2,216,128,0,8,2,172,128,56,8,0,52,128,28,200,3,236,128,12,200,0,236,128,63,8,1,180,128,3,200,3,128,128,43,136,0,0,128,42,8,3,144,128,5,72,1,128,128,63,200,1,60,128,7,200,3,180,128,39,8,0,0,128,44,8,3,128,128,4,200,1,116,128,63,200,1,92,128,5,200,3,144,128,44,8,0,0,128,37,72,3,204,128,11,8,0,224,128,62,8,2,36,128,0,72,2,216,128,56,136,0,100,128,19,200,3,248,128,29,136,0,24,128,48,72,3,112,128,4,200,1,80,128,63,136,1,216,128,1,72,2,240,128,56,136,0,108,128,17,136,3,236,128,35,8,0,0,128,41,72,3,200,128,12,200,0,156,128,58,136,2,204,128,0,200,1,216,128,63,200,1,140,128,2,8,3,4,128,57,8,0,140,128,13,136,3,192,128,42,200,0,12,128,28,200,3,252,128,27,72,0,16,128,43,136,3,192,128,14,8,0,116,128,54,136,3,68,128,5,72,1,12,128,61,72,2,160,128,0,200,1,168,128,63,200,2,12,128,0,8,2,48,128,63,136,1,140,128,1,8,2,172,128,61,200,1,48,128,3,72,2,252,128,59,72,0,236,128,5,72,3,36,128,57,136,0,196,128,7,72,3,68,128,56,136,0,176,128,7,200,3,76,128,56,136,0,184,128,7,72,3,56,128,57,136,0,204,128,5,200,3,16,128,59,72,1,0,128,3,72,2,216,128,61,136,1,80,128,1,72,2,124,128,63,136,1,192,128,0,8,2,0,128,63,200,2,72,128,0,200,1,104,128,61,136,2,228,128,4,200,0,196,128,55,8,3,128,128,13,136,0,64,128,44,8,3,232,128,26,136,0,0,128,29,136,3,244,128,42,8,0,48,128,14,8,3,128,128,56,8,0,236,128,2,136,2,136,128,63,200,2,24,128,0,200,1,68,128,59,72,3,76,128,11,136,0,64,128,42,8,3,248,128,33,136,0,12,128,19,8,3,160,128,55,136,0,248,128,1,200,2,60,128,63,200,2,148,128,4,8,0,168,128,49,200,3,220,128,27,72,0,0,128,21,8,3,168,128,55,136,1,12,128,0,200,2,0,128,62,200,3,4,128,9,200,0,64,128,39,8,3,252,128,42,8,0,92,128,7,72,2,192,128,63,200,2,96,128,3,200,0,148,128,46,72,3,248,128,36,136,0,52,128,9,72,2,228,128,63,136,2,84,128,4,8,0,132,128,44,8,3,252,128,41,72,0,100,128,5,72,2,112,128,63,200,2,240,128,11,8,0,32,128,31,8,3,216,128,54,8,1,36,128,0,8,1,80,128,55,136,3,204,128,30,72,0,28,128,10,136,2,204,128,63,200,2,192,128,9,200,0,28,128,28,200,3,188,128,57,136,1,156,128,0,200,0,196,128,46,72,3,252,128,45,136,0,184,128,0,200,1,140,128,56,136,3,212,128,33,136,0,64,128,4,200,2,48,128,61,136,3,128,128,24,200,0,16,128,9,200,2,160,128,63,72,3,68,128,20,72,0,4,128,12,72,2,192,128,63,200,3,48,128,19,200,0,0,128,12,72,2,184,128,63,136,3,76,128,21,200,0,12,128,9,72,2,124,128,62,72,3,136,128,28,8,0,48,128,4,136,1,240,128,58,8,3,216,128,38,8,0,148,128,0,136,1,60,128,49,8,3,252,128,51,8,1,92,128,1,8,0,116,128,33,136,3,176,128,61,136,2,124,128,11,136,0,0,128,14,200,2,184,128,62,136,3,152,128,32,8,0,108,128,0,200,1,48,128,47,8,3,248,128,55,136,1,216,128,5,200,0,16,128,19,8,2,240,128,63,8,3,144,128,32,200,0,132,128,0,72,0,236,128,41,72,3,212,128,60,200,2,136,128,14,200,0,4,128,7,72,1,228,128,54,136,3,252,128,52,72,1,180,128,5,200,0,12,128,15,136,2,136,128,60,8,3,228,128,45,136,1,80,128,2,136,0,32,128,19,8,2,192,128,61,72,3,220,128,44,200,1,68,128,3,8,0,24,128,16,200,2,136,128,59,72,3,240,128,49,200,1,180,128,7,72,0,0,128,9,200,1,240,128,52,72,3,248,128,58,136,2,136,128,18,72,0,36,128,1,136,0,236,128,36,136,3,128,128,63,200,3,136,128,38,8,1,12,128,2,72,0,20,128,13,136,2,36,128,53,72,3,248,128,59,200,2,192,128,23,72,0,100,128,0,8,0,108,128,23,72,2,184,128,59,8,3,252,128,56,8,2,112,128,19,200,0,72,128,0,8,0,116,128,23,72,2,172,128,58,8,3,252,128,58,136,2,184,128,24,200,0,140,128,0,72,0,40,128,14,8,2,0,128,49,8,3,212,128,63,136,3,128,128,41,72,1,116,128,8,200,0,8,128,1,200,0,184,128,28,8,2,204,128,57,136,3,252,128,60,200,3,36,128,35,8,1,36,128,5,200,0,0,128,2,72,0,196,128,27,72,2,172,128,55,136,3,240,128,63,8,3,120,128,42,200,1,180,128,13,136,0,60,128,0,8,0,52,128,12,72,1,156,128,40,136,3,76,128,61,136,3,252,128,60,8,3,48,128,38,8,1,128,128,12,72,0,52,128,0,8,0,32,128,9,72,1,68,128,33,136,2,228,128,56,8,3,232,128,63,200,3,192,128,52,72,2,148,128,28,200,1,24,128,7,200,0,28,128,0,8,0,40,128,8,200,1,36,128,29,136,2,148,128,51,8,3,168,128,63,8,3,252,128,60,200,3,104,128,45,136,2,60,128,25,200,0,248,128,7,200,0,36,128,0,8,0,12,128,4,136,0,168,128,18,72,1,192,128,37,72,2,216,128,53,72,3,180,128,62,200,3,252,128,62,136,3,176,128,53,72,2,228,128,39,8,1,228,128,22,136,0,236,128,8,200,0,64,128,1,8,0,0,128,0,136,0,48,128,6,200,0,184,128,17,136,1,128,128,31,8,2,96,128,44,8,3,36,128,55,8,3,176]);

test('A packet with extensions', function (t) {
  var p = new RFC4175Packet(packet0);
  // console.log(JSON.stringify(p, null, 2));
  t.equal(p.getExtendedSequenceNumber(), 0x692b, 'has expected ext. seq. no.');
  t.equal(p.getCompleteSequenceNumber(), (0x692b << 16) | 54110,
    'has expected complete sequence number.');
  t.equal(p.getLineData().length, 1, 'has one item of line data.');
  var lineData = p.getLineData()[0];
  t.equal(lineData.length, 1350, 'has expected line data length.');
  t.equal(lineData.fieldID, false, 'is first field (fieldID = false).');
  t.equal(lineData.lineNo, 21, 'if for line 21.');
  t.equal(lineData.offset, 0, 'has zero offset.');
  t.equal(lineData.continuation, false, 'has no continuation.');
  t.deepEqual(lineData.data,
    packet0.slice(p.getPayloadStart() + 8,
      p.getPayloadStart() + 8 + lineData.length),
    'has expected payload.');
  t.end();
});

test('A packet with continuation', function (t) {
  var p = new RFC4175Packet(packet3);
  // console.log(JSON.stringify(p, null, 2));
  t.equal(p.getExtendedSequenceNumber(), 0x692b, 'has expected ext. seq. no.');
  t.equal(p.getCompleteSequenceNumber(), (0x692b << 16) | 54113,
    'has expected complete sequence number.');
  t.equal(p.getLineData().length, 2, 'has two items of line data.');
  var lineData = p.getLineData()[0];
  t.equal(lineData.length, 600, 'has expected 1st line data length.');
  t.equal(lineData.fieldID, false, 'is 1st line first field (fieldID = false).');
  t.equal(lineData.lineNo, 21, 'is 1st line 21.');
  t.equal(lineData.offset, 0, 'has 1st line zero offset.');
  t.equal(lineData.continuation, true, 'has 1st line no continuation.');
  t.deepEqual(lineData.data,
    packet3.slice(p.getPayloadStart() + 8,
      p.getPayloadStart() + 8 + lineData.length),
    'has 1st line expected payload.');
  var prevLength = lineData.length;
  lineData = p.getLineData()[1];
  t.equal(lineData.length, 825, 'has expected line data length.');
  t.equal(lineData.fieldID, false, 'is first field (fieldID = false).');
  t.equal(lineData.lineNo, 22, 'if for line 22.');
  t.equal(lineData.offset, 0, 'has zero offset.');
  t.equal(lineData.continuation, false, 'has no continuation.');
  t.deepEqual(lineData.data,
    packet0.slice(p.getPayloadStart() + 8,
      p.getPayloadStart() + 8 + lineData.length),
    'has expected payload.');
  t.end();
});
