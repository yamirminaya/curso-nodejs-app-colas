const fs = require('fs')

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero
    this.escritorio = escritorio
  }
}

class TicketControl {
  constructor() {
    //* Último ticket
    this.ultimo = 0
    //* Conocer día
    this.hoy = new Date().getDate()
    this.tickets = []
    this.ultimos4 = []

    //* Leyendo archivo JSON
    let data = require('../data/data.json')
    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo
      this.tickets = data.tickets
      this.ultimos4 = data.ultimos4
    } else {
      this.reiniciarConteo()
    }
  }

  getUltimos4() {
    return this.ultimos4
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      //return res.json({ok:false})
      return 'No hay tickets'
    }
    let numeroTicket = this.tickets[0].numero
    console.log(numeroTicket)
    //* Eliminar el primer ticket del arreglo
    this.tickets.shift()

    let atenderTicket = new Ticket(numeroTicket, escritorio)
    console.log(atenderTicket)
    this.ultimos4.unshift(atenderTicket)

    if (this.ultimos4.length > 4) {
      //* Borra el último elemento
      this.ultimos4.splice(-1, 1)
    }

    console.log('Ultimos 4')
    console.log(this.ultimos4)

    this.grabarArchivo()
    return atenderTicket
  }

  siguiente() {
    this.ultimo += 1
    let ticket = new Ticket(this.ultimo, null)
    this.tickets.push(ticket)
    this.grabarArchivo()
    return `Ticket ${this.ultimo}`
  }

  reiniciarConteo() {
    this.ultimo = 0
    this.tickets = []
    this.ultimos4 = []
    console.log('Se ha inicializado el sistema')
    this.grabarArchivo()
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets, //tickets pendientes de atender
      ultimos4: this.ultimos4,
    }
    let jsonDataString = JSON.stringify(jsonData)
    fs.writeFileSync('./server/data/data.json', jsonDataString)
  }
}

module.exports = {
  TicketControl,
}
