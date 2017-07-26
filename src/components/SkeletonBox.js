import React from 'react';
import {connect} from 'react-redux';
// import * as commonActions from '../../actions/commonActions';

class SkeletonBox extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = {};
  }

  randomRowWidth(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  displayRow(){
    let _props = this.props;
    let _height = _props.boxHeight;
    let _backgroundColor = _props.boxColor

    let _width = this.props.boxWidth || `${this.randomRowWidth(100, 70)}%`
    let _margin = this.props.rowSpace
    let _radius = this.props.boxRadius
    return(
      <div className="skeletonRow" style={{
        width: `${_width}`,
        height: `${_height}`,
        backgroundColor: _backgroundColor,
        marginTop: `${_margin}`,
        marginBottom: `${_margin}`,
        borderRadius: `${_radius}`
      }}></div>
    )
  }
  displayRows(){
    if(this.props.rows > 1){
      let rowsArray = Array.from(Array(this.props.rows))
      return(
        <div className="skeletonRows">
          {rowsArray.map((row, index) => <div key={index}>{this.displayRow()}</div>)}
        </div>
      )
    }else{
      return(
        this.displayRow()
      )
    }
  }
  render(){
    return(
      <div className="skeletonContainer">
        {this.displayRows()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    rows: ownProps.rows           || 1,            // The number of rows you want displayed
    boxHeight: ownProps.boxHeight || '25px',  // The height of each box
    boxWidth: ownProps.boxWidth,    // How wide (Leave blank for a range between 80-100% of container width)
    rowSpace: ownProps.rowSpace   || '15px',    // Vertical space between the rows
    boxRadius: ownProps.boxRadius || '3px',   // Border Radius for the box
    boxColor: ownProps.boxColor   || '#F2F2F2'
  };
}

function mapDispatchToProps(dispatch){
  return{
    // common_actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkeletonBox);
