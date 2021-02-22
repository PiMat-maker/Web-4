import React from "react";
import FormCheckBoxes from "./Form/FormCheckBoxes";
import Y from "./Form/y";
import { connect } from "react-redux";
import { FormPostFetch } from "./redux/actions/FormFetch";
import { setAnswer } from "./redux/reducers/formReducer";
import { withRouter } from "react-router-dom";

class Form extends React.Component {
  submit = (e) => {
    //check R chosen
    if (this.props.form.r.length === 0) {
      this.props.setAnswer("R not chosen");
      return;
    }

    //check right R chosen
    for (let valR of this.props.form.r) {
      if (valR <= 0) {
        console.log("Wrong R chosen (only R > 0)");
        this.props.setAnswer(
            "Wrong R chosen (only R > 0)"
        );
        return;
      }
    }

    //check X chosen
    if (this.props.form.x.length === 0) {
      console.log("X not chosen");
      this.props.setAnswer(
          "X not chosen"
      );
      return;
    }

    console.log("Send request");

    //make FormData and send it
    const formData = new FormData();
    for (let i = 0; i < this.props.form.x.length; ++i) {
      for (let j = 0; j < this.props.form.r.length; ++j) {
        const index = i * this.props.form.r.length + j;
        formData.append(`x[${index}]`, this.props.form.x[i]);
        formData.append(`y[${index}]`, this.props.form.y);
        formData.append(`r[${index}]`, this.props.form.r[j]);
      }
    }
    //could not to work properly
    this.props.FormPostFetch(formData);
  };

  render() {
    return (
        <div id="form">
          <form>
            <FormCheckBoxes variable="X" />
            <Y />
            <FormCheckBoxes variable="R" />
          </form>
          <input
              id="form_button"
              type="submit"
              value="Жмяк"
              onClick={this.submit}
          />
          <br />

          <label className="error"> {this.props.form.answer} </label>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (error) => dispatch(setAnswer(error)),
  FormPostFetch: (formData) => dispatch(FormPostFetch(formData))
});

const mapStateToProps = (state) => ({
  form: state.form
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
