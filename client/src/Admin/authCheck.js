import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies  from 'universal-cookie';


class AuthCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Authenticated: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const cookies = new Cookies();
    var isAuth = cookies.get('role') == 'admin' || cookies.get('role') == 'owner';
    if (!isAuth) {

        history.push('/');
    } else {
      this.setState({ Authenticated: true });
    }
  }

  render() {
    const { children } = this.props;
    const { Authenticated } = this.state;
    if (Authenticated === false) {
      return (
        <div>loading....</div>
      );
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default withRouter(AuthCheck);

//used code from https://stackoverflow.com/questions/56746273/how-to-i-prevent-user-from-accessing-the-page-of-my-react-app-directly-by-enteri

