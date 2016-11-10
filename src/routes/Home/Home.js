import React from 'react'
import './Home.sass'

const store = {
  products: [
    {nombre: "Iphone", precio: 50000},
    {nombre: "Sony", precio: 38000},
    {nombre: "Xbox", precio: 30000}
  ]
}

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carrito: [
        {ref: "Iphone", cantidad: 0},
        {ref: "Sony", cantidad: 0},
        {ref: "Xbox", cantidad: 0}
      ]
    }
  }

  deleteElement = (i, event) => {
    event.preventDefault()
    const lista = this.state.carrito.slice()
    let datos = store.products.find((datos)=> datos.nombre === this.state.carrito[i].ref)
    
    if(datos.nombre === this.state.carrito[i].ref)
        lista[i].cantidad--

    this.setState({carrito: lista})
  }

  updateValue = (i,event) => {
    const lista = this.state.carrito.slice()

    lista.find((product) => {
      if(product.ref === this.state.carrito[i].ref)
        lista[i].cantidad = event.target.value
    })
    this.setState({carrito: lista})
  }


  añadirElemento = (i, event) => {
    event.preventDefault()
    const lista = this.state.carrito.slice()
    let datos = store.products.find((datos)=> datos.nombre === this.state.carrito[i].ref)

    if(datos.nombre === this.state.carrito[i].ref)
      lista[i].cantidad++
  
    this.setState({carrito: lista})
  }


  render = () => {

    const productos = store.products.map((producto,i) =>
      <div key={i} id="producto">
        <h5>{producto.nombre}</h5>
        <p>{producto.precio/100}€</p>
        <button onClick={this.añadirElemento.bind(this, i)}>Añadir al carrito</button>
      </div>
      )

    const list = this.state.carrito.map((producto, i) => {
      if(producto.cantidad > 0){
        let datos = store.products.find((datos)=> datos.nombre === producto.ref)
        return (
          <li key={i}>
            <h4>{datos.nombre}</h4>
            <input id="cantidad" value={producto.cantidad} onChange={this.updateValue.bind(this, i)} />
            <h4>{(datos.precio*producto.cantidad)/100}€</h4>
            <button onClick={this.deleteElement.bind(this, i)}>Eliminar</button>
          </li>)
        }
      }
    )

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
