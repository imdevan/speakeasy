import React from 'react';
import onClickOutside from 'react-onclickoutside';

class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      dropDownOffsetY: 0,
      dropDownOffsetX: 0
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.calculateTransform = this.calculateTransform.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentDidMount() {
    this.calculateTransform();
  }

  handleClickOutside() {
    this.closeDropDown()
  }

  toggleDropDown() {
    this.setState({ open: !this.state.open });
  }

  closeDropDown() {
    this.setState({ open: false });
  }

  calculateTransform() {
    const { position } = this.props;
    let dropDownOffsetY = 0;
    let dropDownOffsetX = 0;

    dropDownOffsetY = 8;
    dropDownOffsetX = this.childElement.clientWidth - this.dropDownElement.clientWidth;

    this.setState({ dropDownOffsetY, dropDownOffsetX });
  }

  renderDropDownOption(option) {
    const { dropDownItemClassName } = this.props;

    if(React.isValidElement(option))
      return option

    return (
      <div className={`${dropDownItemClassName}`} onClick={option.onClick}>
        {option.label}
      </div>
    )
  }

  renderDropDown() {
    const {options} = this.props;

    return (
      <div>
        {options.map((option, index) => {
          return <div key={index} onClick={this.closeDropDown}>
            {this.renderDropDownOption(option)}
          </div>
        })}
      </div>
    )
  }

  render() {
    const {
      options,
      containerClassName,
      dropDownContainerClassName,
      className,
      position,
      children,
    } = this.props;
    const {
      open,
      dropDownOffsetY,
      dropDownOffsetX
    } = this.state;

    return (
      <section className={`position-relative ${containerClassName}`}>
        <div className={`${className} c-pointer`}
          onClick={this.toggleDropDown}
          ref={c => this.childElement = c}>
          {children}
        </div>
        <div className={`c-dropdown ${dropDownContainerClassName}  ${open ? '' : 'invisible'}`}
          style={{ transform: `translate(${dropDownOffsetX}px, ${dropDownOffsetY}px)` }}
          ref={dropDownElement => this.dropDownElement = dropDownElement}>
          {this.renderDropDown(options)}
        </div>
      </section>
    );
  }
}

DropDown.defaultProps = {
  options: [],
  dropDownItemClassName: 'c-dropdown__row',
  dropDownContainerClassName: '',
  className: ''
};

export default onClickOutside(DropDown);
