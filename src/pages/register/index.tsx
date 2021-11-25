import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import RegisterComponent from "../../components/Register";
import "./index.css";
interface RegisterPageProps extends RouteComponentProps {}

interface RegisterPageState {}

class RegisterPage extends React.Component<
  RegisterPageProps,
  RegisterPageState
> {
  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {};
  }
  handleRedirect = () => {
    const { history } = this.props;
    let url = "/";
    history.push(url);
  };
  render() {
    return (
      <div className="page">
        <div className="page-container register-container">
          <div className="container">
            <RegisterComponent
              finished={() => {
                this.handleRedirect();
              }}
            ></RegisterComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage);
