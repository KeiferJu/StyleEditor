import React from 'react'

class SelectInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    style: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
  }

  /**
   * llcn
   * @param label
   * @return {*}
   */
  getTitle(label){
    let title = label;
    switch (label){
      case 'Center': title = '中';break;
      case 'Left': title = '左';break;
      case 'Right': title = '右';break;
      case 'Top': title = '上';break;
      case 'Bottom': title = '下';break;
      case 'Top-left': title = '左上';break;
      case 'Top-right': title = '右上';break;
      case 'Bottom-left': title = '左下';break;
      case 'Bottom-right': title = '右下';break;

      case 'None': title = '无变换';break;
      case 'Uppercase': title = '大写';break;
      case 'Lowercase': title = '小写';break;

      default: title = label;
    }
    return title;

  };

  render() {
    let options = this.props.options
    if(options.length > 0 && !Array.isArray(options[0])) {
      options = options.map(v => [v, v])
    }


    return <select
      className="maputnik-select"
      style={this.props.style}
      value={this.props.value}
      onChange={e => this.props.onChange(e.target.value)}
    >
      { options.map(([val, label]) =>
        <option key={val} value={val}>{this.getTitle(label)}</option>) }
    </select>
  }
}

export default SelectInput
