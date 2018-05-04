import React from 'react';
import onClickOutside from 'react-onclickoutside';

class ClickOutsideContainer extends React.Component {
  handleClickOutside(evt) {
    const { onClickOutside } = this.props;
    onClickOutside(evt);
  }

  render() {
    const { children, className = '' } = this.props;

    return (
      <div className={`${className}`}>
        {children}
      </div>
    );
  }
}

ClickOutsideContainer.defaultProps = {
  onClickOutside: () => { }
}

export default onClickOutside(ClickOutsideContainer);
