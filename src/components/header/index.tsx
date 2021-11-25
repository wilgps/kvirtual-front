import {
  Popover,
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  NavDropdown,
} from "react-bootstrap";

import React from "react";
import { Link } from "react-router-dom";
import userMenu from "../../assets/img/user-menu.svg";
import "./index.css";
import { isAdmin, logout } from "../../services/Auth";
interface FooterComponentProps {}

interface FooterComponentState {
  isAdmin: boolean;
}

class FooterComponent extends React.Component<
  FooterComponentProps,
  FooterComponentState
> {
  /**
   *
   */
  constructor(props:any) {
    super(props);
    this.state = { isAdmin: false };
  }
  componentDidMount = () => {
    this.setState({ isAdmin });
  };
  handlerOnclickUser = (e: any) => {
    e.preventDefault();
  };
  //popover: Popover = {} as Popover;

  popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Link to="/user/update">Editar Cadasto</Link>
        <br />
        <Link innerRef={() => {}} to="" onClick={(e) => logout()}>
          Sair
        </Link>
      </Popover.Body>
    </Popover>
  );

  render() {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              K-Virtual
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {this.state.isAdmin && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}
                <NavDropdown title="Jogos" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/game/math">
                    Matematica
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/game/portuguese">
                    Jogo de Palavras
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={this.popover}
              >
                <button className="btn-user-menu">
                  <img src={userMenu} alt="user" />
                </button>
              </OverlayTrigger>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default FooterComponent;
