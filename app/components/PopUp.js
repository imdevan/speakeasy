import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const PopUp = ({children = ''}) => {
  console.log('popup rendering')
  return(
    <div className='c-pop-up__container'>
      <Grid className='h-100'>
        <Row className='align-items-center justify-content-center h-100'>
          <Col sm={12} md={6}>
            <div className='c-pop-up__body'>
              {children}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default PopUp;
