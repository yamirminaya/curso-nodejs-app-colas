// Comando para establecer la conexion
var socket = io()

socket.on('estadoActual', (resp) => {
  console.log(resp)
  if (resp.ultimos4.length > 0) {
    actualizaHTML(resp.ultimos4)
  }
})

// on 'ultimos 4'
socket.on('ultimos4', (resp) => {
  console.log(resp)
  if (resp.ultimos4.length > 0) {
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    actualizaHTML(resp.ultimos4)
  }
})

function actualizaHTML(ultimos4) {
  ultimos4.forEach(function (v, i) {
    var ind = i + 1
    $('#lblTicket' + ind).text('Ticket ' + v.numero)
    $('#lblEscritorio' + ind).text('Escritorio ' + v.escritorio)
  })
}
