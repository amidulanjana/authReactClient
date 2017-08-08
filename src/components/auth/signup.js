import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SignUp extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <fieldset className={className}>
        <label>
          {field.label}
        </label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </fieldset>
    );
  }

  handleFormSubmit(values) {
    this.props.signupUser(values);
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
        <Field
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          component={this.renderField}
        />
        {this.renderError()}
        <button className="btn btn-info">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Field cannot be empty";
  }
  if (!values.password) {
    errors.password = "Field cannot be empty";
  }
  if (!(values.password == values.confirmPassword)) {
    errors.confirmPassword = "Password and confirm password did not match";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Field cannot be empty";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  validate,
  form: "signup"
})(connect(mapStateToProps, actions)(SignUp));
