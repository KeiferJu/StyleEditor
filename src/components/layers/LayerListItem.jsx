import React from 'react'
import Color from 'color'
import classnames from 'classnames'

import CopyIcon from 'react-icons/lib/md/content-copy'
import VisibilityIcon from 'react-icons/lib/md/visibility'
import VisibilityOffIcon from 'react-icons/lib/md/visibility-off'
import DeleteIcon from 'react-icons/lib/md/delete'

import LayerIcon from '../icons/LayerIcon'
import LayerEditor from './LayerEditor'
import {SortableElement, SortableHandle} from 'react-sortable-hoc'

@SortableHandle
class LayerTypeDragHandle extends React.Component {
  static propTypes = LayerIcon.propTypes

  render() {
    return <LayerIcon
      {...this.props}
      style={{
        cursor: 'move',
        width: 14,
        height: 14,
        paddingRight: 3,
      }}
    />
  }
}

class IconAction extends React.Component {
  static propTypes = {
    action: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }

  renderIcon() {
    switch(this.props.action) {
      case 'copy': return <CopyIcon />
      case 'show': return <VisibilityIcon />
      case 'hide': return <VisibilityOffIcon />
      case 'delete': return <DeleteIcon />
      default: return null
    }
  }

  /**
   * llcn
   * @return {*}
   */
  getDoc(){
    switch(this.props.action) {
      case 'copy': return '复制';
      case 'show': return '显示';
      case 'hide': return '隐藏';
      case 'delete': return '删除';
      default: return null
    }
  }
  render() {
    // console.log(this.props)
    return <a
      className="maputnik-layer-list-icon-action"
      onClick={this.props.onClick}
      title = {this.getDoc()}
    >
      {this.renderIcon()}
    </a>
  }
}

@SortableElement
class LayerListItem extends React.Component {
  static propTypes = {
    layerId: React.PropTypes.string.isRequired,
    layerType: React.PropTypes.string.isRequired,
    isSelected: React.PropTypes.bool,
    visibility: React.PropTypes.string,
    className: React.PropTypes.string,

    onLayerSelect: React.PropTypes.func.isRequired,
    onLayerCopy: React.PropTypes.func,
    onLayerDestroy: React.PropTypes.func,
    onLayerVisibilityToggle: React.PropTypes.func,
  }

  static defaultProps = {
    isSelected: false,
    visibility: 'visible',
    onLayerCopy: () => {},
    onLayerDestroy: () => {},
    onLayerVisibilityToggle: () => {},
  }

  static childContextTypes = {
    reactIconBase: React.PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: { size: 14 }
    }
  }

  render() {
    return <li
      key={this.props.layerId}
      onClick={e => this.props.onLayerSelect(this.props.layerId)}
      className={classnames({
        "maputnik-layer-list-item": true,
        "maputnik-layer-list-item-selected": this.props.isSelected,
        [this.props.className]: true,
      })}>
        <LayerTypeDragHandle type={this.props.layerType} />
        <span className="maputnik-layer-list-item-id">{this.props.layerId}</span>
        <span style={{flexGrow: 1}} />
        <IconAction
          action={'delete'}
          onClick={e => this.props.onLayerDestroy(this.props.layerId)}
        />
        <IconAction
          action={'copy'}
          onClick={e => this.props.onLayerCopy(this.props.layerId)}
        />
        <IconAction
          action={this.props.visibility === 'visible' ? 'hide' : 'show'}
          onClick={e => this.props.onLayerVisibilityToggle(this.props.layerId)}
        />
    </li>
  }
}

export default LayerListItem;
