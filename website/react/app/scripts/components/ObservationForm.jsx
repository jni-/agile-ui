import React from 'react'
import Observation from '../domain/observation.js'
import Directive from '../domain/directive.js'
import UUID from '../utils/uuid.js'
import { Modal, Table, Button, Glyphicon, Input } from 'react-bootstrap';

class ObservationForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {observation: props.observation, onObservationChanged: props.onObservationChanged}
  }

  componentWillReceiveProps(props) {
    this.setState({observation: props.observation, onObservationChanged: props.onObservationChanged})
  }

  componentDidUpdate() {
    let fields = this.findInputFields();
    [].forEach.call(fields, (i) => i.addEventListener('keypress', (e) => {
      if(e.keyCode === 13) {
        this.close();
      }
    }))
  }

  componentWillUnmount() {
    let fields = this.findInputFields();
    [].forEach.call(fields, (i) => i.addEventListener('keypress'))
  }

  findInputFields() {
    return document.querySelectorAll(".observationModalForm input");
  }

  close() {
    this.props.onPtiUpdated();
  }

  handleNameChanged(e) {
    let observation = this.state.observation;
    observation.name = e.target.value;
    this.forceUpdate();
  }

  handleDirectiveChanged(directive, e) {
    directive.name = e.target.value;
    this.forceUpdate();
  }

  addDirective() {
    this.state.observation.directives.push(new Directive(UUID.newUUID(), ""))
    this.forceUpdate();
  }

  render() {
    if(!this.state.observation) {
      return false;
    }

    let directives = this.state.observation.directives.map(d => {
      return (
        <Input type="text" key={d.key} value={d.name} onChange={this.handleDirectiveChanged.bind(this, d)} />
      )
    });

    return (
      <Modal show={true} onHide={this.close.bind(this)} className="observationModalForm">
        <Modal.Header closeButton>
          <Modal.Title>Editing: {this.state.observation.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text" value={this.state.observation.name} label="Observation: " onChange={this.handleNameChanged.bind(this)} />

          <Button className="pull-right" onClick={this.addDirective.bind(this)}><Glyphicon glyph="plus" /></Button>
          <p>Change directives</p>
          {directives}
        </Modal.Body>
      </Modal>
    );
  }

}

ObservationForm.propTypes = {
  observation: React.PropTypes.instanceOf(Observation),
  onPtiUpdated: React.PropTypes.func
}

export default ObservationForm
