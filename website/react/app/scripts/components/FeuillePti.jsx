import React from 'react';
import ObservationGrid from './ObservationGrid.jsx'
import DirectiveGrid from './DirectiveGrid.jsx'
import Pti from '../domain/pti.js'
import { Alert } from 'react-bootstrap'

const FeuillePti = (props) => {
  if(!props.pti) {
    return <Alert bsStyle="danger"><p>Select a PTI first</p></Alert>
  }

  let pti = props.pti;
  return (
    <div>
      <ObservationGrid {...props} />
      <DirectiveGrid {...props} />
    </div>
  );
}

FeuillePti.propTypes = {
  pti: React.PropTypes.instanceOf(Pti),
  onPtiUpdated: React.PropTypes.func
}

export default FeuillePti;
