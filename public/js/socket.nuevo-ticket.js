//* comando para establecer la conexion
var socket = io()

var label = $('#lblNuevoTicket')

//* ON: Escucha al servidor
socket.on('connect', () => {
  console.log('Conectado al servidor')
  // socket.emit('ultimoTicket', {}, function (ultimoTicket) {
  //   label.text(ultimoTicket)
  // })
})
socket.on('disconnect', () => {
  console.log('Perdimos conexión con el servidor')
})

socket.on('estadoActual', (resp) => {
  console.log(resp)
  label.text(resp.actual)
})

$('button').on('click', () => {
  socket.emit('siguienteTicket', {}, function (siguienteTicket) {
    console.log(siguienteTicket)
    label.text(siguienteTicket)
  })
})
