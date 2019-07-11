import HmacSHA1 from 'hmacsha1';

const QiniuApp = {
  Bucket: 'erptest',
  AK: 'cLueJSQ-AhRVleNIqtwBTiwMP8P2dKC-u78_s-wP',
  SK: 'Z9pZMx3jCk38zj2GR3IBMs19C94yyU0OUSdY9-c8'
};

let base64EncodeChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
let Base = {
  utf16to8: function utf16to8(str) {
    let out;
    let i;
    let len;
    let c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  },
  utf8to16: function utf8to16(str) {
    let out;
    let i;
    let len;
    let c;
    let char2;
    let char3;
    out = '';
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break;
        case 12:
        case 13:
          // 110x xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          // 1110 xxxx 10xx xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          );
          break;
        default:
      }
    }
    return out;
  },
  base64encode: function base64encode(str) {
    let out;
    let i;
    let len;
    let c1;
    let c2;
    let c3;
    len = str.length;
    i = 0;
    out = '';
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += '==';
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xf) << 2);
        out += '=';
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
  },
  safe64: function safe64(base64) {
    base64 = base64.replace(/\+/g, '-');
    base64 = base64.replace(/\//g, '_');
    return base64;
  }
};

export default {
  genPutPolicy: function genPutPolicy(bucket, key, deadline, returnBody) {
    return {
      scope: key ? bucket : `${bucket}:${key}`,
      deadline: deadline || new Date().valueOf() + 3600 * 24,
      returnBody: returnBody || '{"key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height)}'
    };
  },
  genToken: function genToken(accessKey, secretKey, putPolicy) {
    let put_policy = JSON.stringify(putPolicy);
    let encoded = Base.base64encode(Base.utf16to8(put_policy));
    let encoded_signed = HmacSHA1(secretKey, encoded);
    let upload_token =
      `${accessKey}:${Base.safe64(encoded_signed)}:${encoded}`;
    return upload_token;
  },
  genUploadToken: function genUploadToken(Key, App) {
    App = App || QiniuApp;
    return this.genToken(App.AK, App.SK, this.genPutPolicy(App.Bucket, Key));
  }
};
