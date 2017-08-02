import React from 'react'
import { saveAs } from 'file-saver'

import GlSpec from '../../style-spec/reference/latest.js'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import SelectInput from '../inputs/SelectInput'
import CheckboxInput from '../inputs/CheckboxInput'
import Button from '../Button'
import Modal from './Modal'
import MdFileDownload from 'react-icons/lib/md/file-download'
import style from '../../libs/style.js'
import formatStyle from '../../style-spec/lib/format'
import GitHub from 'github-api'


class Gist extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    onStyleChanged: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      preview: false,
      saving: false,
      latestGist: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      preview: !!(nextProps.mapStyle.metadata || {})['maputnik:openmaptiles_access_token']
    })
  }

  onSave() {
    this.setState({
      ...this.state,
      saving: true
    });
    const preview = this.state.preview && (this.props.mapStyle.metadata || {})['maputnik:openmaptiles_access_token'];

    const mapStyleStr = preview ?
      formatStyle(stripAccessTokens(style.replaceAccessToken(this.props.mapStyle))) :
      formatStyle(stripAccessTokens(this.props.mapStyle));
    const styleTitle = this.props.mapStyle.name || 'Style';
    const htmlStr = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>`+styleTitle+` Preview</title>
    <link rel="stylesheet" type="text/css" href="https://api.mapbox.com/mapbox-gl-js/v0.28.0/mapbox-gl.css" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v0.28.0/mapbox-gl.js"></script>
    <style>
      body { margin:0; padding:0; }
      #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
  </head>
  <body>
    <div id='map'></div>
    <script>
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'style.json',
          attributionControl: true,
          hash: true
        });
        map.addControl(new mapboxgl.NavigationControl());
    </script>
  </body>
  </html>
`
    const files = {
      "style.json": {
        content: mapStyleStr
      }
    }
    if(preview) {
      files["index.html"] = {
        content: htmlStr
      }
    }
    const gh = new GitHub();
    let gist = gh.getGist(); // not a gist yet
    gist.create({
      public: true,
      description: styleTitle,
      files: files
    }).then(function({data}) {
      return gist.read();
    }).then(function({data}) {
      this.setState({
        ...this.state,
        latestGist: data,
        saving: false,
      });
    }.bind(this));
  }

  onPreviewChange(value) {
    this.setState({
      ...this.state,
      preview: value
    })
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

  renderPreviewLink() {
    const gist = this.state.latestGist;
    const user = gist.user || 'anonymous';
    const preview = !!gist.files['index.html'];
    if(preview) {
      return <span><a target="_blank" href={"https://bl.ocks.org/"+user+"/"+gist.id}>Preview</a>,{' '}</span>
    }
    return null;
  }

  renderLatestGist() {
    const gist = this.state.latestGist;
    const saving = this.state.saving;
    if(saving) {
      return <p>Saving...</p>
    } else if(gist) {
      const user = gist.user || 'anonymous';
      return <p>
        Latest saved gist:{' '}
        {this.renderPreviewLink(this)}
        <a target="_blank" href={"https://gist.github.com/"+user+"/"+gist.id}>Source</a>
      </p>
    }
  }

  render() {
    return <div className="maputnik-export-gist">
      <Button onClick={this.onSave.bind(this)}>
        <MdFileDownload />
        存储到Gist (匿名)
      </Button>
      {' '}
      <CheckboxInput
        value={this.state.preview}
        name='gist-style-preview'
        onChange={this.onPreviewChange.bind(this)}
      />
      <span> 包含预览</span>
      {this.state.preview ?
        <div>
          <InputBlock
            label={" Access Token(授权码): "}>
            <StringInput
              value={(this.props.mapStyle.metadata || {})['maputnik:openmaptiles_access_token']}
              onChange={this.changeMetadataProperty.bind(this, "maputnik:openmaptiles_access_token")}/>
          </InputBlock>
          <a target="_blank" href="https://openmaptiles.com/hosting/">得到免费的Access Token(授权码)</a>
        </div>
        : null}
      {this.renderLatestGist()}
    </div>
  }
}

function stripAccessTokens(mapStyle) {
  const changedMetadata = { ...mapStyle.metadata }
  delete changedMetadata['maputnik:mapbox_access_token']
  delete changedMetadata['maputnik:openmaptiles_access_token']
  return {
    ...mapStyle,
    metadata: changedMetadata
  }
}

class ExportModal extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    onStyleChanged: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    onOpenToggle: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  downloadStyle() {
    const blob = new Blob([formatStyle(stripAccessTokens(this.props.mapStyle))], {type: "application/json;charset=utf-8"});
    saveAs(blob, this.props.mapStyle.id + ".json");
  }

  render() {
    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      title={'导出样式'}
    >

      <div className="maputnik-modal-section">
        <h4>下载样式</h4>
        <p>
          下载一个JSON格式的样式到您的电脑!
        </p>
        <Button onClick={this.downloadStyle.bind(this)}>
          <MdFileDownload />
          下载
        </Button>
      </div>

      {/*<div className="maputnik-modal-section">*/}
        {/*<h4>存储样式</h4>*/}
        {/*<Gist mapStyle={this.props.mapStyle} onStyleChanged={this.props.onStyleChanged}/>*/}
      {/*</div>*/}
    </Modal>
  }
}

export default ExportModal
