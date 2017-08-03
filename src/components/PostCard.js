import React from 'react';
import { Row, Col } from 'react-bootstrap';

const PostCard = ({post}) => {
  if (!post) return null;

  const renderImage = image => {
    const imageStyle = {
      backgroundImage: `url(${post.better_featured_image.source_url})`,
      backgroudSize: 'fill',
      backgroundPosition: 'center'
    }

    return <div className='c-h-4 c-h-md-7 d-block' style={imageStyle} />
  }

  return (
    <div className='c-post-card c-bg-white'>
        {post.better_featured_image && <Row>
          <Col sm={12}>
            {renderImage(post.better_featured_image)}
          </Col>
        </Row>}
      <Row >
        <Col sm={12}>
          <div className='p-4'>
            {post.title &&
            <h3 className='mb-4'
              dangerouslySetInnerHTML={{__html: post.title.rendered}} />}
            {/* Wordpress wraps excert in p tag by default */}
            {post.excerpt && <small
              dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PostCard;
