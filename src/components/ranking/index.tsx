import moment from "moment";
import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { IRanking } from "../../models/Ranking";
import { GetRanking } from "../../services/RankingService";

interface RankingProps {}

interface RankingState {
  Math: IRanking[];
  Portuguese: IRanking[];
}

class Ranking extends React.Component<RankingProps, RankingState> {
  constructor(props: RankingProps) {
    super(props);
    this.state = { Math: [], Portuguese: [] };
  }
  componentDidMount = () => {
    this.getRankings();
  };
  getRankings = async () => {
    let math = await GetRanking("Math");
    let por = await GetRanking("Portuguese");

    this.setState({ Math: math, Portuguese: por });
  };
  render() {
    console.log(this.state.Math);
    return (
      <React.Fragment>
        <Row>
          <Col lg="6">
            {this.state.Math.length > 0 && (
              <fieldset>
                <legend>Matematica</legend>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Pontos</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Math.map((x, i) => (
                      <React.Fragment key={i}>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{x.User?.Name}</td>
                          <td>{x.Points}</td>
                          <td>{moment(x.Date).format("DD/MM/YYYY HH:mm")}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </fieldset>
            )}
          </Col>
          <Col lg="6">
            {this.state.Portuguese.length > 0 && (
              <fieldset>
                <legend>Portugues</legend>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Pontos</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Portuguese.map((x, i) => (
                      <React.Fragment key={i}>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{x.User?.Name}</td>
                          <td>{x.Points}</td>
                          <td>{moment(x.Date).format("DD/MM/YYYY HH:mm")}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </fieldset>
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Ranking;
