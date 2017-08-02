import React from 'react'
import classnames from 'classnames'
import Button from '../Button'

class MultiButtonInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  /**
   * llcn
   * setting title
   * @type {string}
   */
  getTitle(label){
    let title = label;
    switch (label){
      case 'Map': title = '地图';break;
      case 'Viewport': title = '检视';break;

      case 'Butt': title = '平直';break;
      case 'Round': title = '圆角';break;

      case 'Square': title = '直角';break;
      case 'Miter': title = '斜角';break;
      case 'Bevel': title = '斜切';break;

      case 'Point': title = '点';break;
      case 'Line': title = '线';break;

      case 'Auto':  title = '自动';break;

      case 'Left':  title = '左';break;
      case 'Center':  title = '中间';break;
      case 'Right':  title = '右';break;


      case 'Width':  title = '宽';break;
      case 'Height':  title = '高';break;
      case 'Both':  title = '全部匹配';break;



      default: title = label;
    }
    return title;
  }

  render() {
    let options = this.props.options
    if(options.length > 0 && !Array.isArray(options[0])) {
      options = options.map(v => [v, v])
    }

    const selectedValue = this.props.value || options[0][0]
    const buttons = options.map(([val, label])=> {


      return <Button
        key={val}
        onClick={e => this.props.onChange(val)}
        className={classnames({"maputnik-button-selected": val === selectedValue})}
      >
        {this.getTitle(label)}
      </Button>
    })

    return <div className="maputnik-multibutton">
      {buttons}
    </div>
  }
}

export default MultiButtonInput
