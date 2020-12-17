const { io } = require('../server')

const { TicketControl } = require('../classes/ticket-control')
const ticketControl = new TicketControl()

io.on('connection', (client) => {
  client.on('siguienteTicket', (data, callback) => {
    let siguienteTicket = ticketControl.siguiente()
    callback(siguienteTicket)
  })

  // client.on('ultimoTicket', (data, callback) => {
  //   let ultimoTicket = ticketcontrol.getUltimoTicket()
  //   callback(ultimoTicket)
  // })

  // client.emit('estadoActual', {
  //   actual: ticketControl.getUltimoTicket() })

  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  })

  client.on('atenderTicket', (data, callback) => {
    console.log(data)
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario',
      })
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio)
    callback(atenderTicket)

    //* Actualizar / notificar cambios en los ÚLTIMOS 4
    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4(),
    })
  })
})
