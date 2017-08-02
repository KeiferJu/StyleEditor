import React from 'react'

import GlSpec from '../../style-spec/reference/latest.js'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import SelectInput from '../inputs/SelectInput'
import Modal from './Modal'

class SettingsModal extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    onStyleChanged: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    onOpenToggle: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  changeStyleProperty(property, value) {
    const changedStyle = {
      ...this.props.mapStyle,
      [property]: value
    }
    this.props.onStyleChanged(changedStyle)
  }

  changeMetadataProperty(property, value) {
    const changedStyle = {
      ...this.props.mapStyle,
      metadata: {
        ...this.props.mapStyle.metadata,
        [property]: value
      }
    }
    this.props.onStyleChanged(changedStyle)
  }

  render() {
    const metadata = this.props.mapStyle.metadata || {}
    const inputProps = { }
    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      //title={'Style Settings'}
      title={'样式设置'}
    >
      <div style={{minWidth: 350}}>
      {/*<InputBlock label={"Name"} doc={GlSpec.$root.name.doc}>*/}
      <InputBlock label={"名称"} doc={"一个阅读性较强的样式名称!"}>
        <StringInput {...inputProps}
          value={this.props.mapStyle.name}
          onChange={this.changeStyleProperty.bind(this, "name")}
        />
      </InputBlock>
      <InputBlock label={"所有者"} doc={"样式所有者的ID. 被Mapbox或者将来的样式API使用."}>
        <StringInput {...inputProps}
          value={this.props.mapStyle.owner}
          onChange={this.changeStyleProperty.bind(this, "owner")}
        />
      </InputBlock>
      {/*<InputBlock label={"Sprite URL"} doc={GlSpec.$root.sprite.doc}>*/}
      <InputBlock label={"背景图URL"} doc={"获取雪碧图和元数据的url.扩展名`.png`, `.json` 和比例`@2x.png` 会自定添加.如果任何图层使用“background-pattern”，“fill-pattern”，“line-pattern”，“fill-extrusion-pattern”或“icon-image”属性，则这个属性是必需的."}>
        <StringInput {...inputProps}
          value={this.props.mapStyle.sprite}
          onChange={this.changeStyleProperty.bind(this, "sprite")}
        />
      </InputBlock>

      <InputBlock label={"字体URL"} doc={"用于以PBF格式加载有符号距离字段集的URL模板.URL必须包含`{fontstack}`和`{range}'标记。 如果任何图层使用“text-field”布局属性，则此属性是必需的."}>
        <StringInput {...inputProps}
          value={this.props.mapStyle.glyphs}
          onChange={this.changeStyleProperty.bind(this, "glyphs")}
        />
      </InputBlock>

      {/*<InputBlock label={"Mapbox Access Token"} doc={"Mapbox服务的公开授权码."}>*/}
        {/*<StringInput {...inputProps}*/}
          {/*value={metadata['maputnik:mapbox_access_token']}*/}
          {/*onChange={this.changeMetadataProperty.bind(this, "maputnik:mapbox_access_token")}*/}
        {/*/>*/}
      {/*</InputBlock>*/}

      {/*<InputBlock label={"OpenMapTiles Access Token"} doc={"OpenMapTiles CDN的公开授权码!"}>*/}
        {/*<StringInput {...inputProps}*/}
          {/*value={metadata['maputnik:openmaptiles_access_token']}*/}
          {/*onChange={this.changeMetadataProperty.bind(this, "maputnik:openmaptiles_access_token")}*/}
        {/*/>*/}
      {/*</InputBlock>*/}

      {/*<InputBlock label={"Style Renderer"} doc={"Choose the default Maputnik renderer for this style."}>*/}
      {/*<InputBlock label={"样式渲染器"} doc={"为此样式选择默认的渲染器."}>*/}
        {/*<SelectInput {...inputProps}*/}
          {/*options={[*/}
            {/*['mbgljs', 'MapboxGL JS'],*/}
            {/*['ol3', 'Open Layers 3'],*/}
          {/*]}*/}
          {/*value={metadata['maputnik:renderer'] || 'mbgljs'}*/}
          {/*onChange={this.changeMetadataProperty.bind(this, 'maputnik:renderer')}*/}
        {/*/>*/}
      {/*</InputBlock>*/}
      </div>
    </Modal>
  }
}

export default SettingsModal
