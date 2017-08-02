import React from 'react'
import StringInput from './StringInput'
import NumberInput from './NumberInput'

class ArrayInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.array,
    type: React.PropTypes.string,
    length: React.PropTypes.number,
    default: React.PropTypes.array,
    onChange: React.PropTypes.func,
  }

  changeValue(idx, newValue) {
    console.log(idx, newValue)
    const values = this.values.slice(0)
    values[idx] = newValue
    this.props.onChange(values)
  }

  get values() {
    return this.props.value || this.props.default || []
  }

  render() {
    const inputs = this.values.map((v, i) => {
      if(this.props.type === 'number') {
        return <NumberInput
          key={i}
          value={v}
          onChange={this.changeValue.bind(this, i)}
        />
      } else {
        return <StringInput
          key={i}
          value={v}
          onChange={this.changeValue.bind(this, i)}
        />
      }
    })

    return <div className="maputnik-array">
      {inputs}
    </div>
  }
}

export default ArrayInput
