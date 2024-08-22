import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

const initialState = {
  apple: 0,
  orange: 0,
  banana: 0,
  pineapple: 0,
  grape: 0,
  total: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.fruit]: state[action.fruit] + 1,
        total: state.total + 1,
      }
    case 'remove':
      if (state[action.fruit] !== 0) {
        return {
          ...state,
          [action.fruit]: state[action.fruit] - 1,
          total: state.total - 1,
        }
      }
    default:
      return state
  }
}

const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="shop">
      <nav>
        <h1>Groceries</h1>
      </nav>
      <div className="both">
        <div className="items">
          <h4>items</h4>
          {Object.keys(state)
            .filter((key) => key !== 'total')
            .map((fruit) => (
              <div key={fruit} className="item">
                <h2>{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</h2>
                <button
                  onClick={() => {
                    dispatch({ type: 'add', fruit })
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: 'remove', fruit })
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="cart">
          <h4>Cart</h4>
          {Object.keys(state)
            .filter((key) => key !== 'total')
            .map((fruit) => (
              <div key={fruit} className="item">
                <h2>{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</h2>
                <p>{state[fruit]}</p>
              </div>
            ))}
          <div className="item">
            <h2>Total</h2>
            <p>{state.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Cart />
  </React.StrictMode>
)
