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

  // 定义初始化路由方法
  init(app) {
    this.app = app;
    const history = this.history;

    // 路由变化监听函数
    const setupListeners = () => {
      history.setupListeners();
    };

    // 初始化时 首先根据当前页面路径渲染一次页面
    history.transitionTo(history.getCurrentLocation(), setupListeners);

    // 初始化完成之后
    history.listen((route) => {
      app._route = route;
    });
  }

  // 跳转
  push(location) {
    this.history.push(location);
  }

  // 替换
  replace(location) {
    this.history.replace(location);
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
