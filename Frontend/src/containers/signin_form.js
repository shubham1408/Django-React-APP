/* eslint-disable no-class-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../utils/redux-form-fields';
import { signin } from '../actions/Authentication';

class Signin extends Component {
  componentDidMount() {
    const { authenticated } = this.props.auth;
    if (authenticated) {
      this.props.history.push('/');
    }
  }

  formSubmit(formValue) {
    this.props.signin(formValue, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { loginError } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div className="columns columns-signin">
        <div className="column">
          <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
            <Field
              component={renderInput}
              type="text"
              name="username"
              label="Username"
            />
            <Field
              component={renderInput}
              type="password"
              name="password"
              label="Paassword"
            />
            <div className="form-group">
              {loginError ? (
                <div className="form-group">
                  <span className="label label-error">{loginError}</span>
                </div>
              ) : (
                ''
              )}
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signin = withRouter(Signin);

Signin = reduxForm({
  form: 'SigninForm',
  fields: ['username', 'password'],
})(Signin);

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  { signin }
)(Signin);
