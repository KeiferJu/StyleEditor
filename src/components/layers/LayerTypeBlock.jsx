import React from 'react'

import GlSpec from '../../style-spec/reference/latest.js'
import InputBlock from '../inputs/InputBlock'
import SelectInput from '../inputs/SelectInput'


class LayerTypeBlock extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  /**
   * llcn
   * @return {XML}
   */
  render() {
    return <InputBlock label={"类型"} doc={GlSpec.layer.type.doc}>
      <SelectInput
        options={[
          ['background', '背景'],
          ['fill', '充满'],
          ['line', '路线'],
          ['symbol', '标志'],
          ['raster', '栅格'],
          ['circle', '圆'],
          ['fill-extrusion', '充满挤压'],
        ]}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    </InputBlock>
  }
}

export default LayerTypeBlock
