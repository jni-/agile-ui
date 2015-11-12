import React from 'react';
import PtiStore from '../stores/pti_store.js'


const defaultValue = 0;

class PtiList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: PtiStore(), value: defaultValue};
  }

  handleChange(e) {
    this.setState({value: e.target.value})
    this.props.onPtiChanged(this.state.items.filter(i => i.key == e.target.value)[0])
  }

  render() {
    let defaultOption = <option key={defaultValue}>Choose a PTI</option>;
    let listItems = [].concat(defaultOption, this.state.items.map(item => { return <option key={ item.key } value={ item.key }>{ item.name }</option> }));
    return (
      <select onChange={this.handleChange.bind(this)} value={this.state.value} className="form-control">
        {listItems}
      </select>
    );
  }

}

PtiList.propTypes = {
}

export default PtiList;
