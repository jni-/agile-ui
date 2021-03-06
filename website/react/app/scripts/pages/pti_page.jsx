import React from 'react';
import PtiList from '../components/PtiList.jsx';
import PtiSheet from '../components/PtiSheet.jsx';

class PtiPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {pti: undefined};
  }

  selectedPtiChanged(pti) {
    this.setState({pti: pti});
  }

  refreshPti() {
    this.setState({pti: this.state.pti});
  }

  render() {
    return (
      <div>
        <PtiList onPtiChanged={this.selectedPtiChanged.bind(this)} />
        <PtiSheet pti={this.state.pti} onPtiUpdated={this.refreshPti.bind(this)} />
      </div>
    );
  }
}

export default PtiPage;
