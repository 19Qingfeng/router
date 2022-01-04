import { BaseHistory } from './base';

export class HashHistory extends BaseHistory {
  constructor(router) {
    super(router);
    // 初始化hash路由时 同时确保Hash之后是以/开头
    ensureSlash();
  }
}

/**
 * 确保路由
 *
 * @returns
 */
function ensureSlash() {
  const path = getHash();
  // 如果 # 之后是以 / 开头，直接return true
  if (path.charAt(0) === '/') {
    return true;
  }
  // 否则添加 /
  replaceHash('/' + path);
  return false;
}

/**
 * 比如传入
 * 首先获取当前#前的基础路径 比如http://hycoding.com/#/a/b
 * 此时 base为 http://hycoding.com/
 * 之后使用传入的路径拼接 `${base}#${path}` 返回
 * @param {*} path
 * @returns
 */
function getUrl(path) {
  const href = window.location.href;
  const i = href.indexOf('#');
  const base = i >= 0 ? href.slice(0, i) : href;
  return `${base}#${path}`;
}

function replaceHash(path) {
  window.location.replace(getUrl(path));
}

/**
 * 获取当前页面中#之后的路径 如果不存在#则返回空
 * 当前这里你也可以使用 window.location.hash 获取，但是它存在兼容性问题
 * @export
 * @returns /a/b
 */
export function getHash() {
  let href = window.location.href;
  const index = href.indexOf('#');
  if (index < 0) return '';

  href = href.slice(index + 1);

  return href;
}
