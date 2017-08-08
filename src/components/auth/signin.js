import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as action from "../../actions/index";

class SignIn extends Component {
  handleFormSubmit(values) {
    this.props.signinUser(values);
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField(field) {
    return (
      <fieldset className="form-group">
        <label>
          {field.label}
        </label>
        <input className="form-control" type={field.type} {...field.input} />
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        {this.renderError()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, action)(SignIn));
