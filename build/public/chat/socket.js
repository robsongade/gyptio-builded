var socket = null;

$(function() {
  connectRoom();
});

function connectRoom() {
  if (socket !== null) {
    console.log('disconnect');
    socket.close();
  }

  var channel = $('#channel').val();
  socket = io({
    query: 'ch=' + channel,
    resource: 'socket.io'
  });

  socket.on('message', function(msg) {
    setMessage(msg.name, msg.message);
  });
}

function sendMessage(name, message) {
  setMessage(name, message);
  socket.emit('message', { name, message });
}
