import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveRank } from '../services/saveToLocal';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackMsg from '../components/FeedbackMsg';
import BtnPlayAgain from '../components/BtnPlayAgain';

class Feedback extends Component {
  render() {
    const { name, image, hits, history, total } = this.props;
    saveRank(name, image, total);
    return (
      <div>
        Tela de Feedback
        <FeedbackHeader />
        <FeedbackMsg />
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-score">{ hits }</span>
          {' questões!'}
        </p>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-question">{ total }</span>
          {' pontos!'}
        </p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">VER RANKING</button>
        </Link>
        <BtnPlayAgain history={ history } testid="btn-play-again" />
      </div>
    );
  }
}

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  hits: state.scoreReducer.hits,
  score: state.scoreReducer.score,
  total: state.scoreReducer.total,
  name: state.userReducer.name,
  image: state.userReducer.image,
});

export default connect(mapStateToProps)(Feedback);
