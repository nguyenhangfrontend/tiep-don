import styled from 'styled-components';

export const Main = styled.div`
  .video-screen {
    height: 80%;
    min-height: 438px;
    background-color: #011620;
    position: relative;
  }

  button.take-photo {
    background: none;
    border: 3px solid #46ace0;
    width: 62px;
    height: 62px;
    color: #46ace0;
    border-radius: 100%;
    font-size: 27px;
  }
  .btn-upload-file {
    position: relative;
  }
  .btn-upload-file input[type='file'] {
    display: inline-block;
    width: 97px;
    opacity: 0;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    height: 100%;
    visibility: hidden;
  }

  .take-photo .btn-upload-file img {
    width: auto;
    margin-right: 10px;
  }
  .display-error {
    display: none;
  }
  .take-photo .image-preview img {
    position: absolute;
    top: 50%;
    max-width: 40%;
    height: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed;
  }

  .webcam-inner {
    width: 60%;
    position: relative;
    z-index: 999;
    text-align: center;
    z-index: 999;
    background-color: #314047;
    margin: auto;
    padding-top: 17px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .video-screen {
    height: 80%;
    min-height: 438px;
  }

  .webcam-inner video {
    height: 100%;
    object-fit: initial;
    width: 59%;
    min-height: 450px;
  }

  .image-preview {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #000000;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
  }

  .icon-avatar button {
    background: none;
    border: none;
  }
  #container-circles {
    bottom: 0;
    #outer-circle {
      background-color: transparent;
      #inner-circle {
        background: transparent;
        top: 45px;
      }
    }
  }
  #display-error {
    display: none;
  }
`;
