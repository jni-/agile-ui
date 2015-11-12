import React from 'react';
import Pti from '../domain/pti.js'
import ObservationForm from './ObservationForm.jsx'
import { Table, Button, Glyphicon } from 'react-bootstrap'

class DirectiveGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {pti: props.pti, editing: undefined}
  }

  componentWillReceiveProps(props) {
    this.setState({pti: props.pti, editing: undefined})
  }

  editObservation(observationKey) {
    let observation = this.state.pti.findObservationByKey(observationKey)
    this.setState({editing: observation});
  }

  render() {

    let directivesPerObservation = this.groupDirectivesByObservation()
    let rows = directivesPerObservation.map(({observationKey, observationOrder, directive}) => {
      return (
        <tr key={directive.key}>
          <td>{observationOrder}</td>
          <td>{directive.name}</td>
          <td><Button bsSize="xsmall" onClick={this.editObservation.bind(this, observationKey)}><Glyphicon glyph="pencil" /></Button></td>
        </tr>
      )
    })

    return (
      <div>
        <ObservationForm observation={this.state.editing} onPtiUpdated={this.props.onPtiUpdated}/>
        <Table id="directive-grid" condensed striped bordered hover>
          <caption>Directives</caption>
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
    );
  }

  groupDirectivesByObservation() {
    let pti = this.state.pti;
    let directivesPerObservation = []
    pti.observations.forEach((observation) => {
      observation.directives.forEach((directive) => {
        directivesPerObservation.push({
          observationKey: observation.key,
          observationOrder: observation.order,
          directive: directive
        })
      })
    })

    return directivesPerObservation
  }
}

DirectiveGrid.propTypes = {
  onPtiUpdated: React.PropTypes.func,
  pti: React.PropTypes.instanceOf(Pti)
}

export default DirectiveGrid;
