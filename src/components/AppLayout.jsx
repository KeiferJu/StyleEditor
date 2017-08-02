import React from 'react'
import ScrollContainer from './ScrollContainer'


class AppLayout extends React.Component {
  static propTypes = {
    toolbar: React.PropTypes.element.isRequired,
    layerList: React.PropTypes.element.isRequired,
    layerEditor: React.PropTypes.element,
    map: React.PropTypes.element.isRequired,
    bottom: React.PropTypes.element,
    layerChart: React.PropTypes.element.isRequired,
    onCloseDrawer: React.PropTypes.func
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

    return <div className="maputnik-layout">
      {/*list窗体*/}
      <div className="maputnik-layout-list">
        {this.props.toolbar}
        <ScrollContainer>
        {this.props.layerList}
        </ScrollContainer>
      </div>
      {/*绘制工具窗体*/}
      <div className={this.props.classDrawer}>
        <ScrollContainer>
          {this.props.layerEditor}
        </ScrollContainer>
        <button className={this.props.classDrawer+'-close'} onClick={this.props.onCloseDrawer.bind(this)}>×</button>
        {this.props.layerChart}
      </div>
      {/*图表*/}

      {/*地图*/}
      {this.props.map}
      {this.props.bottom && <div className="maputnik-layout-bottom">
          {this.props.bottom}
        </div>
      }



    </div>
  }
}

export default AppLayout
