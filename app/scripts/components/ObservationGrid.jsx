import React from 'react';
import Pti from '../domain/pti.js'
import ObservationForm from './ObservationForm.jsx'
import { Table, Button, Glyphicon } from 'react-bootstrap'

class ObservationGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pti: props.pti, editing: undefined }
  }

  componentWillReceiveProps(props) {
    this.setState({pti: props.pti, editing: undefined})
  }

  editObservation(observation) {
    this.setState({editing: observation});
  }

  render() {
    let pti = this.state.pti;
    let rows = pti.observations.map((observation) => {
      return (
        <tr key={observation.key}>
          <td>{observation.order}</td>
          <td>{observation.name}</td>
          <td><Button bsSize="xsmall" onClick={this.editObservation.bind(this, observation)}><Glyphicon glyph="pencil" /></Button></td>
        </tr>
      )
    })

    return (
      <div>
        <ObservationForm observation={this.state.editing} onPtiUpdated={this.props.onPtiUpdated}/>
        <Table id="observation-grid" condensed striped bordered hover>
          <caption>Observations</caption>
          <thead>
            <tr>
              <th>Observation #</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    )
  }
}

ObservationGrid.propTypes = {
  onPtiUpdated: React.PropTypes.func,
  pti: React.PropTypes.instanceOf(Pti)
}

export default ObservationGrid;
