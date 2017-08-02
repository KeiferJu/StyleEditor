import React from 'react'

export default class DocLabel extends React.Component {
  static propTypes = {
    label: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ]).isRequired,
    doc: React.PropTypes.string.isRequired,
  }


  /**
   * llcn
   * @param label
   * @return {*}
   */
  getTitle(label){
    let title = label;
    switch (label){
      case 'Color': title = '颜色';break;
      case 'Pattern': title = '样式';break;
      case 'Opacity': title = '透明度';break;
      case 'Width': title = '宽度';break;
      case 'Offset': title = '偏移';break;
      case 'Blur': title = '模糊';break;
      case 'Antialias': title = '消除锯齿';break;
      case 'Outline color': title = '轮廓颜色';break;
      case 'Translate': title = '转换';break;
      case 'Translate anchor': title = '转换参照点';break;
      case 'Dasharray': title = '虚线';break;
      case 'Gap width': title = '间隙宽度';break;
      case 'Join': title = '连接方式';break;
      case 'Miter limit': title = '斜度限制';break;
      case 'Round limit': title = '范围限制';break;
      case 'Cap': title = '末端样式';break;
      //图标
      case 'Placement': title = '图标位置';break;
      case 'Spacing': title = '间距';break;
      case 'Avoid edges': title = '忽略压盖';break;
      //文本
      case 'Field': title = '标记';break;
      case 'Font': title = '字体';break;
      case 'Size': title = '大小';break;
      case 'Line height': title = '行高';break;
      case 'Padding': title = '内边距';break;
      case 'Allow overlap': title = '允许覆盖';break;
      case 'Ignore placement': title = '忽略位置';break;
      case 'Pitch alignment': title = '间距对齐';break;
      case 'Rotation alignment': title = '旋转对齐';break;
      case 'Max width': title = '最大宽度';break;
      case 'Letter spacing': title = '文本间距';break;
      case 'Justify': title = '对齐方式';break;
      case 'Anchor': title = '文本锚点';break;
      case 'Max angle': title = '最大旋转角度';break;
      case 'Rotate': title = '旋转角度';break;
      case 'Keep upright': title = '保持竖直';break;
      case 'Transform': title = '大小写转换';break;


      case 'Optional': title = '是否显示';break;
      case 'Text fit': title = '文本适配';break;
      case 'Text fit padding': title = '文本适配填充';break;
      case 'Image': title = '图片';break;


      case 'Halo color': title = '光晕颜色';break;
      case 'Halo width': title = '光晕宽度';break;
      case 'Halo blur': title = '光晕模糊';break;

      case 'Extrusion opacity': title = '挤压透明度';break;
      case 'Extrusion color': title = '挤压颜色';break;
      case 'Extrusion translate': title = '挤压转换';break;
      case 'Extrusion translate anchor': title = '挤压转换参考点';break;
      case 'Extrusion pattern': title = '挤压样式';break;
      case 'Extrusion height': title = '挤压高度';break;
      case 'Extrusion base': title = '挤压基础';break;


      default: title = label;
    };
    return title;
  }
  render() {
    return <label className="maputnik-doc-wrapper">
      <div className="maputnik-doc-target">
        <span>{this.getTitle(this.props.label)}</span>
        <div className="maputnik-doc-popup">
          {this.props.doc}
        </div>
      </div >
    </label>
  }
}
