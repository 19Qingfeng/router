import { createMatcher } from './crate-matcher';
import { HashHistory } from './history/hash';
import { HTML5History } from './history/html5';

import install from './install';

class VueRouter {
  constructor(options) {
    this.options = options;

    // 创建路由匹配器
    this.matcher = createMatcher(options.routes || []);

    // 获取路由模式 默认是hash
    const mode = options.mode || 'hash';
    this.mode = mode;

    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this);
        break;
      case 'history':
        this.history = new HTML5History(this);
        break;
    }
  }

  // 注册多个路由
  addRoutes(routes) {
    this.matcher.addRoutes(routes);
  }

  // 注册路由
  addRoute(parentOrRoute, route) {
    this.matcher.addRoute(parentOrRoute, route);
  }

  // 根据获取当前所有活跃的路由Record对象
  getRoutes() {
    return this.matcher.getRoutes();
  }
}

VueRouter.install = install;

export default VueRouter;
