import { HttpParams } from '@angular/common/http';
import { stringify } from 'query-string';
import { isArray } from 'util';

export function toFormData(obj: any, form: FormData = null, namespace: string = null, ignoreList: boolean = false) {

  return objectToFormData(obj, form, namespace, ignoreList);

}
function objectToFormData(obj: any, form: FormData, rootName: string, ignoreList: boolean = false) {
  var formData = form || new FormData();
  function appendFormData(data, root) {
    if (!ignore(root)) {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          appendFormData(data[i], root + '[' + i + ']');
        }
      } else if (typeof data === 'object' && data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === '') {
              appendFormData(data[key], key);
            } else {
              appendFormData(data[key], root + '.' + key);
            }
          }
        }
      } else {
        if (data !== null && typeof data !== 'undefined') {
          formData.append(root, data);
        }
      }
    }
  }

  function ignore(root) {
    return Array.isArray(ignoreList)
      && ignoreList.some(function (x) { return x === root; });
  }

  appendFormData(obj, rootName);

  return formData;
}
export function toHttpParams(obj: any, params: HttpParams = null, namespace: string = null, ignoreList: boolean = false) {

  return objectToHttpParams(obj, params, namespace);

}
function objectToflattenList(obj: any, list: { key: string; value: string }[] = null, prefix: string = "", ignoreList: boolean = false) {
  list = list || [];
  let p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = "", v = null;
      if (isArray(obj)) {
        k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
      }
      else {
        k = prefix ? prefix + "." + p : p,
          v = obj[p];
      }

      if (v !== null) {
        if (typeof v === "object") {
          objectToflattenList(v, list, k);
        } else {
          list.push({ key: k, value: v });
        }
      }
    }
  }
}
function objectToHttpParams(obj: any, params: HttpParams = null, namespace: string = null) {
  const list = [];
  objectToflattenList(obj, list);
  let httpParams = new HttpParams();
  list.forEach(x => {
    if (x.value != null)
      httpParams = httpParams.append(x.key, x.value);
  });
  return httpParams;
}

