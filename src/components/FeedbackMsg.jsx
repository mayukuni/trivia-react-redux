import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMsg extends Component {
  render() {
    const { hits } = this.props;
    const VERIFY = 3;
    const msg = (hits < VERIFY ? 'Podia ser melhor...' : 'Mandou bem!');
    return (
      <div data-testid="feedback-text" className="feedback-text teste3">{ msg }</div>
    );
  }
}

FeedbackMsg.propTypes = {
  hits: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  hits: state.scoreReducer.hits,
});

export default connect(mapStateToProps)(FeedbackMsg);
