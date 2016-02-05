/* Copyright 2016 Christine S. MacNeill

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

module.exports = function (RED) {
    function WebRTCOut (config) {
      RED.nodes.createNode(this, config);
      var node = this;
      var waiting = true;
      var lastMsg = null;
      node.on('input', function (msg) {
        // Transform message - perform action
        msg.next();
      });
    }
    RED.nodes.registerType("webRTC-out",WebRTCOut);
  }
  