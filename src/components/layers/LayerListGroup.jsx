import React from 'react'
import Collapser from './Collapser'

export default class LayerEditorGroup extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    onActiveToggle: React.PropTypes.func.isRequired
  }

  /**
   * llcn
   * @param label
   * @return {*}
   */
  getTitle(label){
    let title = label;
    switch (label){
      // case 'road': title = '路';break;
      // case 'tunnel': title = '隧道';break;
      // case 'aeroway': title = '航线';break;
      // case 'railway': title = '铁路';break;
      // case 'bridge': title = '桥梁';break;
      // case 'admin': title = 'admin';break;
      // case 'place': title = '地点';break;
      // case 'landcover': title = '土地覆盖';break;
      // case 'landuse': title = '土地使用';break;


      default: title = label;
    }
    return title;

  };

  render() {

    return <div className="maputnik-layer-list-group">
      <div className="maputnik-layer-list-group-header"
        onClick={e => this.props.onActiveToggle(!this.props.isActive)}
      >
        <span className="maputnik-layer-list-group-title">{this.getTitle(this.props.title)}</span>
        <span className="maputnik-space" />
        <Collapser
          style={{ height: 14, width: 14 }}
          isCollapsed={this.props.isActive}
        />
      </div>
    </div>
  }
}
