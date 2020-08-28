import { call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';

import { ModalAction } from 'components/Modal';
export function formatName(namebn) {
  const name = namebn.trim();
  const formatName = name.replace(/\s+/g, ' ');
  const arr = formatName.split(' ');
  const length = arr.length;

  return arr.reduce((finalTex, item, i) => {
    if (0 < i && i < length - 2) {
      finalTex = finalTex.concat(`${item.charAt(0)}. `);
    } else {
      finalTex = finalTex.concat(`${item} `);
    }
    return finalTex;
  }, '');
}

export function formatDataSelect(data) {
  if (data) {
    return data.map(item => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }
}
export function formatPhoneNumber(str){
  //Filter only numbers from the input
  
    let cleaned = ('' + str).replace(
      /\D/g,
      '',
    );
    let match = cleaned.match(
      /^(\d{4})(\d{3})(\d{3})$/,
    );

    if (match) {
      return (
        match[1] +
        ' ' +
        match[2] +
        ' ' +
        match[3]
      );
    }
  
  return str;

  //Check if the input is of correct length
};

export const formatAge = age => `${age || ''} tuổi`;

export function* checkCode(callback, param, nameFunction) {
  const repos = yield call(callback, param);
  switch (repos.code) {
    case 0:
      if(nameFunction){
        toast.success(`${nameFunction} thành công !`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
      break;
    case 3000:
      toast.error(` Không kết nối được với server his`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      break;
    case 3001:
      toast.error(`Server his lỗi!`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      break;
    case 3051:
      toast.error(`Không lấy được token từ server BHYT`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      break;
    case 3050:
      toast.error(`Không kết nối được với server BHYT`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      break;
    case 3100:
      let message = repos.message;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      break;
    case 3052:
      var codeInsurance = repos.data.maKetQua;

      switch (codeInsurance) {
        case '000':
          toast.error(`Thông tin thẻ chính xác`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '001':
          toast.error(
            `Thẻ do BHXH Bộ Quốc Phòng quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân`,
            {
              position: toast.POSITION.TOP_RIGHT,
            },
          );
          break;
        case '002':
          toast.error(
            `Thẻ do BHXH bộ Công An quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân`,
            {
              position: toast.POSITION.TOP_RIGHT,
            },
          );
          break;
        case '003':
          toast.error(`Thẻ cũ hết giá trị sử dụng, được cấp thẻ mới`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '004':
          toast.error(`Thẻ cũ còn giá trị sử dụng, được cấp thẻ mới`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '010':
          toast.error(`Thẻ hết giá trị sử dụng`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '051':
          toast.error(`Mã thẻ không đúng`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '052':
          toast.error(`Mã tỉnh cấp thẻ (ký tự thứ 4,5) của thẻ không đúng`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '053':
          toast.error(`Mã quyền lợi (ký tự thứ 3) của thẻ không đúng`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '050':
          toast.error(`Không có thông tin thẻ`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '060':
          toast.error(`Thẻ sai họ tên`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '061':
          toast.error(`Thẻ sai họ tên (đúng ký tự đầu)`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '070':
          toast.error(`Thẻ sai ngày sinh`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '100':
          toast.error(`Lỗi khi lấy dữ liệu sổ thẻ`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '101':
          toast.error(`Lỗi server`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '110':
          toast.error(`Thẻ đã thu hồi`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '120':
          toast.error(`Thẻ đã báo giảm`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '121':
          toast.error(`Thẻ đã báo giảm chuyển ngoại tỉnh`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '122':
          toast.error(`Thẻ đã báo giảm chuyển nội tỉnh`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '123':
          toast.error(`Thẻ đã báo giảm do tăng lại cùng đơn vị`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '124':
          toast.error(`Thẻ đã báo giảm ngừng tham gia`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '130':
          toast.error(`Trẻ em không xuất trình thẻ`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '205':
          toast.error(`Lỗi sai định dạng tham số`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case '401':
          toast.error(`Lỗi xác thực tài khoản`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        default:
          toast.error('Lỗi server!', {
            position: toast.POSITION.TOP_RIGHT,
          });
      }

      break;
    case 3060:
      toast.error(`Thẻ BH lỗi`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;

    default:
      toast.error(`${nameFunction} thất bại!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
  }
  return repos;
}

export function* getPropsDuplicate(data, modalType, payload){
  const modalProps = {
    data,
    modalActions: payload.modalActions,
    modalData: payload.modalData
  };

  yield put(ModalAction.showModal({ modalType, modalProps }));
}
