import React from "react"
import { TransitionGroup, Transition as ReactTransition } from "react-transition-group"

const timeout = 500

const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0
  },
  entered: {
    perspective: '1000px',
    transform: 'rotateY(0deg)',
    transformOrigin: 100,    
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1
  },
  exiting: {
    transform: 'rotateY(180deg)',
    transformOrigin: 0,  
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0
  }
}

function Transition({ children, location }) {
  return (
    <TransitionGroup>
      <ReactTransition key={location.pathname} timeout={{ enter: timeout, exit: timeout }}>
        {
          status => (
            <div style={{ ...getTransitionStyles[status]}}>
              {children}
            </div>
          )
        }
      </ReactTransition>
    </TransitionGroup>
  )
}

export default Transition
