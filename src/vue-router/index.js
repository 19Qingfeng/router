import { createMatcher } from './crate-matcher';
import install from './install';

class VueRouter {
  constructor(options) {
    this.options = options;

    // 创建路由匹配器
    this.matcher = createMatcher(options.routes || []);

    // 获取路由模式 默认是hash
    const mode = options.mode || 'hash';
    switch (mode) {
      case 'hash':
        // do something
        break;
      case 'history':
        // do something
        break;
    }
  }
}

VueRouter.install = install;

export default VueRouter;
