import React from 'react'
import './Home.sass'

const store = {
  products: [
    {id: 'gadget001', nombre: "Iphone", precio: 50000},
    {id: 'gadget002', nombre: "Sony", precio: 38000},
    {id: 'gadget003', nombre: "Xbox", precio: 30000}
  ]
}

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carrito: [],
      editing: []
    }
    this.focusInput = null
  }

  deleteElement = (id, event) => {
    event.preventDefault()
    const lista = this.state.carrito.slice()
    //Buscamos el indice del elemento del carrito donde llamamos a la funcion
    let indice = lista.findIndex((producto)=> producto.ref === id)
    //si el valor del elemento es menor o igual 1 lo eliminamos del carrito, si no lo decrementamos 
    if (lista[indice].cantidad <= 1) {
      lista.splice(indice, 1)
    } else {
      lista[indice].cantidad--
    }

    this.setState({carrito: lista})
  }

  inEdition = (id, event) => {
    const lista = this.state.carrito.slice()
    let edition = this.state.editing
    let indice = lista.findIndex((producto) => producto.ref === id)

    edition.element = lista[indice].ref
    edition.value = event.target.innerHTML

    this.setState({carrito: lista, editing: edition})

  }

  saveEdition = (id, event) => {
    const lista = this.state.carrito.slice()
    let edition = this.state.editing
    let indice = lista.findIndex((producto)=> producto.ref === id)

    if (lista[indice].cantidad === "" ) {
      lista[indice].cantidad = edition.value
    } else {
      edition.value = event.target.value
    }

    edition = []
    this.setState({carrito: lista, editing: edition})
  }

  updateValue = (id,event) => {
    //Buscamos el elemento que estamos editando
    //Guardamos el estado del valor inicial del input antes de modificarlo
    /*Si cuando se introduce un numero y el valor es valido (si no es nulo) se guarda en el state, 
     si no lo es y cambiamos de foco restauramos el valor inicial*/
    const lista = this.state.carrito.slice()
    let edition = this.state.editing
    let indice = lista.findIndex((producto) => producto.ref === id)

    if (event.target.value != "") {
      edition.value = event.target.value
    }

    lista[indice].cantidad = event.target.value

    this.setState({carrito: lista, editing: edition})
  }


  añadirElemento = (id, event) => {
    event.preventDefault()
    const lista = this.state.carrito.slice()
    let indice = lista.findIndex((producto)=> producto.ref === id)

    // Buscamos si esta en la carrito, si no esta inicializamos a 1, si no la incrementamos

    if (indice === -1) {
      lista.push({ref: id, cantidad: 1 })
    } else {
      lista[indice].cantidad++
    }

    this.setState({carrito: lista})
  }

  componentDidUpdate() {
    if(this.focusInput) this.focusInput.focus()
  }

  render = () => {

    const productos = store.products.map((producto,i) =>
      <div key={i} id="producto">
        <h5>{producto.nombre}</h5>
        <p>{producto.precio/100}€</p>
        <button onClick={this.añadirElemento.bind(this, producto.id)}>Añadir al carrito</button>
      </div>
      )

    const list = this.state.carrito.map((producto, i) => {
      if (producto.cantidad >=0 && (producto.cantidad.length != 0 || producto.cantidad == "" )) {
        let datos = store.products.find((datos)=> datos.id === producto.ref)
        let cantidad = null
        if (producto.ref === this.state.editing.element && this.state.editing) {
          cantidad = <input id="cantidad" ref={(selectedInput) => this.focusInput = selectedInput} value={producto.cantidad} onChange={this.updateValue.bind(this, producto.ref)} onBlur={this.saveEdition.bind(this, producto.ref)}/>
        }
        else {
          cantidad = <span id="cantidad" onClick={this.inEdition.bind(this, producto.ref)} >{producto.cantidad}</span>
        }
        return (
          <li key={i}>
            <h4>{datos.nombre}</h4>
            <label>Cantidad</label>
            {cantidad}
            <p>{(datos.precio*producto.cantidad)/100}€</p>
            <button onClick={this.deleteElement.bind(this, producto.ref)}><p>x</p></button>
          </li>
        )
      }
    })

    return (
      <div id="tienda">
        <div id="productos">
          {productos}
        </div>
        <div id="carrito">
          <h4>Carrito</h4>
          <form>
            <ol>
              {list}
            </ol>
          </form>
        </div>
      </div>
    )
  }

}

export default Home
