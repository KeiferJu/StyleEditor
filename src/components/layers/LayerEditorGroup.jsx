import React from 'react'
import Collapse from 'react-collapse'
import Collapser from './Collapser'

export default class LayerEditorGroup extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element.isRequired,
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
      case 'Paint properties': title = '绘制属性';break;
      case 'Layout properties': title = '布局属性';break;
      case 'General layout properties': title = '总体布局属性';break;
      case 'Text layout properties': title = '文本布局属性';break;
      case 'Icon layout properties': title = '图标布局属性';break;
      case 'Text paint properties': title = '文本绘制属性';break;
      case 'Icon paint properties': title = '图标绘制属性';break;


      default: title = label;
    }
    return title;

  };


  render() {

    return <div>
      <div className="maputnik-layer-editor-group"
        onClick={e => this.props.onActiveToggle(!this.props.isActive)}
      >
        <span>{this.getTitle(this.props.title)}</span>
        <span style={{flexGrow: 1}} />
        <Collapser isCollapsed={this.props.isActive} />
      </div>
      <Collapse isOpened={this.props.isActive}>
        {this.props.children}
      </Collapse>
    </div>
  }
}
