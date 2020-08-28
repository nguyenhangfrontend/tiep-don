import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import EventLayerWrapper from 'components/EventLayerWrapper';
import { Main } from './styled';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import KeyEventWrapper from 'components/KeyEventWrapper';
import PrintIcon from 'resources/svg/print-white.svg';


const WebcamModal = ({ avatar, modalActions, type, title }) => {
  const [urlPreview, setUrlPreview] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  
  const [fileUpload, setFileUpload] = useState('');
  const [fileName, setFileName] = useState('');
  const selectPhoto = () => {
    const selectPhoto = document.getElementById('selectPhoto');

    selectPhoto && selectPhoto.click();
  };


  //Usage example:
  const dataURLtoFile = (dataurl, filename) => {
    if (dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  };

  const selectImage = (e, isCapture) => {
    
    let file = '';
    let fileUpload = '';
    let urlPreview = '';
    let fileName = '';

    if (isCapture) {
      const base64regex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
      const isbase64 = base64regex.test(e);
      if (isbase64) {
        let dataUri = e || e.onTakePhoto.dataUri;
        const imageSrc = dataUri;

        file = dataURLtoFile(imageSrc, 'image.jpg');
        urlPreview = imageSrc;
        fileUpload = file;
        fileName = '';
      }
    } else {
      urlPreview = URL.createObjectURL(e.target.files[0]);
      fileUpload = e.target.files[0];
      fileName = fileUpload.name;
    }
    setFileName(fileName);
    setImageSrc(file);
    setFileUpload(fileUpload)
    setUrlPreview(urlPreview)
  };

  const uploadImage = () => {
    let fileName = null;
    if (imageSrc) fileName = imageSrc;
    fileName = fileUpload;
   
    modalActions(fileName);
  };
  

  const reTakePhoto = () => {
    
    setFileName('');
    setImageSrc('');
    setFileUpload('')
    setUrlPreview('')
  };
  const srcAvatar = (avatar && avatar.absoluteUrl());
  const footer = callback => (
    <div className="text-right">
      <div className="action-capture">
        <div className="row">
          <div className="col-md-4 text-left">
            <Button
              className={'btn-print btn-upload-file'}
              icon={<PrintIcon />}
              keyCode={85}
              controlKey={'altKey'}
              onClick={selectPhoto}
            >
              <input
                className="service-input active-element"
                id="selectPhoto"
                type="file"
               
                onChange={e => selectImage(e)}
              />
              <span className="icon-button icon-down">UPLOAD</span>
            </Button>

            <span>{fileName}</span>
          </div>
          <div className="col-md-4 text-center">
            
            <Button
              className={'take-photo service-input active-element'}
              onClick={() => {
                const photo = document.getElementById('outer-circle');
                photo.click();
              }}
              keyCode={67}
              controlKey={'altKey'}
            >
              <i className="fa fa-camera" aria-hidden="true"></i>
            </Button>
          </div>

          <div className="col-md-4 text-right">
            <Button
              className="btn-save text-uppercase"
              onClick={reTakePhoto}
              keyCode={76}
              controlKey={'altKey'}
              icon={<PrintIcon />}
            >
              Chụp lại
            </Button>
            <Button
              className="btn-print text-uppercase"
              keyCode={13}
              icon={<PrintIcon />}
              onClick={() => {
                uploadImage();
                callback();
              }}
            >
              Lưu lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <EventLayerWrapper layerEvent={{ key: 'cameraModal', events: [] }}>
      <KeyEventWrapper keyCode={27}>
        <Main>
          <Modal
            className="mokup capture-popup"
            show
            footer={footer}
            width={'75%'}
            isDark
          >
            <div className="webcam-inner">
              <h4 className="text-uppercase title-popup">{title}</h4>
              <Main className="video-screen">
                <Camera
                  onTakePhoto={dataUri => {
                    selectImage(dataUri, true);
                  }}
                  isImageMirror={type !== 'scanId'}
                />
                {urlPreview || srcAvatar ? (
                  <imagePreview className="image-preview" style={{ backgroundImage: `url(${urlPreview || srcAvatar})` }} >
                    
                  </imagePreview>
                ) : null}
              </Main>

              <div />
            </div>
          </Modal>
        </Main>
      </KeyEventWrapper>
    </EventLayerWrapper>
  );
};

WebcamModal.defaultProps = {
  data: {},
};

WebcamModal.propTypes = {
  errors: T.object,
  data: T.object,
};

const mapDispatch = dispatch => ({});

export default connect(null, mapDispatch, null, { forwardRef: true })(
  WebcamModal,
);
