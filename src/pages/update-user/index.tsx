import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Register from "../../components/Register";
import { IUser } from "../../models/user";
import api from "../../services/Api";

interface UpdateUserProps extends RouteComponentProps {}

interface UpdateUserState {
  user: IUser;
}

class UpdateUser extends React.Component<UpdateUserProps, UpdateUserState> {
  /**
   *
   */

  constructor(props: any) {
    super(props);
    this.state = { user: {} as IUser };
  }
  handleRedirect = () => {
    const { history } = this.props;
    let url = "/";
    history.push(url);
  };
  componentDidMount = async () => {
    await this.getCurrentUser();
  };
  getCurrentUser = async () => {
    try {
      const response = await api.get("/user");
      this.setState({ user: response.data });
      // response.data;
    } catch (error) {}
  };
  render() {
    return (
      <div className="page">
        <div className="page-container register-container">
          <div className="container">
            <Register
              user={this.state.user}
              finished={() => {
                this.handleRedirect();
              }}
            ></Register>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateUser);
