const formatName = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
const phoneRe = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const regexEmojiChars = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g;
const idNoRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const phoneRemovedWhiteSpace = value => {
  if (value) {
    return value.replace(/ /g, '');
  }
};

const getEmojiChars = text => {
  if (text) {
    return text.match(regexEmojiChars);
  }

  return false;
};

export const rules = {
  required: {
    message: 'required',
    func: (value, options, message) => {
      if (!value && value !== 0) {
        return message || this.message;
      }
      return '';
    },
  },
  formatName: {
    message: 'format name failure!',
    func: (value, options, message) => {
      if (getEmojiChars(value) || formatName.test(value)) {
        return message || this.message;
      }
      return '';
    },
  },

  lengthName: {
    message: 'length name failure!',
    func: (value, options, message) => {
      if (value && value.length > 60) {
        return message || this.message;
      }
      return '';
    },
  },

  phoneFormat: {
    message: 'format phone failure!',
    func: (value, options, message) => {
      if (!phoneRe.test(value)) {
        return message || this.message;
      } else {
        return '';
      }
    },
  },
  phoneLength: {
    message: 'length name failure!',
    func: (value, options, message) => {
      if (
        value &&
        parseInt(phoneRemovedWhiteSpace(value)) !== 0 &&
        (phoneRemovedWhiteSpace(value).length > 18 ||
          phoneRemovedWhiteSpace(value).length < 10)
      ) {
        return message || this.message;
      } else {
        return '';
      }
    },
  },

  idNoFormat: {
    message: 'format phone failure!',
    func: (value, options, message) => {
      if (
        value.length > 0 &&
        (idNoRegex.test(value) ||
          (parseInt(value) !== 0 && (value.length < 8 || value.length > 12)))
      ) {
        return message || this.message;
      } else {
        return '';
      }
    },
  },

  lengthInsurance: {
    func: (value, options, message) => {
      if (value && value.length !== 15) {
        return message || this.message;
      }
      return '';
    },
  },
};
