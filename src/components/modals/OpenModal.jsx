import React from 'react'
import Modal from './Modal'
import Button from '../Button'
import FileReaderInput from 'react-file-reader-input'
import request from 'request'

import FileUploadIcon from 'react-icons/lib/md/file-upload'
import AddIcon from 'react-icons/lib/md/add-circle-outline'

import style from '../../libs/style.js'
import publicStyles from '../../config/styles.json'

class PublicStyle extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    thumbnailUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  }

  render() {
    return <div className="maputnik-public-style">
      <Button
        className="maputnik-public-style-button"
        onClick={() => this.props.onSelect(this.props.url)}
      >
        <header className="maputnik-public-style-header">
          <h4>{this.props.title}</h4>
          <span className="maputnik-space" />
          <AddIcon />
        </header>
        <img
          className="maputnik-public-style-thumbnail"
          src={this.props.thumbnailUrl}
          alt={this.props.title}
        />
      </Button>
    </div>
  }
}

class OpenModal extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onOpenToggle: React.PropTypes.func.isRequired,
    onStyleOpen: React.PropTypes.func.isRequired,
  }

  onStyleSelect(styleUrl) {
    request({
      url: styleUrl,
      withCredentials: false,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const mapStyle = style.ensureStyleValidity(JSON.parse(body))
          console.log('Loaded style ', mapStyle.id)
          this.props.onStyleOpen(mapStyle)
        } else {
          console.warn('Could not open the style URL', styleUrl)
        }
    })
  }

  onUpload(_, files) {
    const [e, file] = files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      let mapStyle = JSON.parse(e.target.result)
      mapStyle = style.ensureStyleValidity(mapStyle)
      this.props.onStyleOpen(mapStyle);
    }
    reader.onerror = e => console.log(e.target);
  }

  render() {
    const styleOptions = publicStyles.map(style => {
      return <PublicStyle
        key={style.id}
        url={style.url}
        title={style.title}
        thumbnailUrl={style.thumbnail}
        onSelect={this.onStyleSelect.bind(this)}
      />
    })

    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      title={'打开样式'}
    >
      <section className="maputnik-modal-section">
        <h2 >上传样式</h2>
        <p>从您的电脑上传一个JSON格式的样式.</p>
        <FileReaderInput onChange={this.onUpload.bind(this)}>
          <Button className="maputnik-upload-button"><FileUploadIcon />上传</Button>
        </FileReaderInput>
      </section>
      {/*<section className="maputnik-modal-section">*/}
        {/*<h2>画廊样式</h2>*/}
        {/*/!*<p>*!/*/}
          {/*/!*Open one of the publicly available styles to start from.*!/*/}
        {/*/!*</p>*!/*/}
        {/*<p>*/}
          {/*打开一个可用的公共样式.*/}
        {/*</p>*/}
        {/*<div className="maputnik-style-gallery-container">*/}
        {/*{styleOptions}*/}
        {/*</div>*/}
      {/*</section>*/}
    </Modal>
  }
}

export default OpenModal
