import React from "react";
import { Col, Row } from "react-bootstrap";
import Ranking from "../../components/ranking";

interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-container register-container">
            <Row>
              <Col md="12">
                <h1>Ranking</h1>
              </Col>
              <Col md="12">
                  <Ranking></Ranking>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
