// THIS COMPONENT SCROLLS THE WINDOW BACK TO THE TOP
import React from 'react'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if(window)
        window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}


export default ScrollToTop;