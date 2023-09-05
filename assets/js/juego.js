
(() => {
  'use estrict'

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];
  /*   let puntosJugador = 0,
        puntosComputadora = 0;
 */
  //Referencias del HTML
  const btnNuevo = document.querySelector('#btnNuevo'),
    btnDetener = document.querySelector('#btnDetener'),
    btnPedir = document.querySelector('#btnPedir');

  const divCartasComputadora = document.querySelector('#computadora-cartas'),
    divCartasJugador = document.querySelector('#jugador-cartas'),
    puntosHTML = document.querySelectorAll('small');




  // Esta función crea nueva baraja.
  const crearDeck = () => {

    deck = [];
    {
      for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos)
          deck.push(i + tipo)
      }
    };

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo)
      }
    };

    return _.shuffle(deck);
  };

  // Funcion pedir carta
  const pedirCarta = () => {

    if (deck.length === 0) {
      throw 'No hay más cartas';
    }

    return deck.pop();
  }



  //Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {

    do {
      const carta = pedirCarta();

      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHTML[1].innerText = puntosComputadora;

      const imgCarta = document.createElement('img');
      imgCarta.src = `cartas/${carta}.png`
      imgCarta.classList.add('cartas')
      divCartasComputadora.append(imgCarta);

      if (puntosJugador > 21)
        break;

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {


      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana :D')
      }
      else if (puntosMinimos > 21) {
        alert('Computadora gana >:D')
      } else if (puntosComputadora > 21) { alert('Gane bitch! :D') } else {
        alert('Computadora gana >:D')
      }

    }, 10);
  }




  const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1); //Buscar substring
    return (isNaN(valor)) ?
      (valor === 'A') ? 11 : 10
      : valor * 1;

  }

  //Evento Click
  btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`
    imgCarta.classList.add('cartas')
    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
      console.warn('Perdiste perdedor');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);

    }
    else if (puntosJugador === 21) {
      console.warn('Esto no se repite más');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    }
  });

  // Detener

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
  );


  //Nuevo Juego
  btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;



  })
}
)();