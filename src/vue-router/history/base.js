/**
 *
 * 寻找完全匹配的路由对象 比如 /about/about1
 * 它会匹配出两个Record路由对象 [{ path:'/about', ... },{ path:'/about/about1',... }]
 * @export
 * @param {*} record
 * @param {*} location
 * @returns
 */
export function createRoute(record, location) {
  const matched = [];

  if (record) {
    while (record) {
      // 首部添加
      matched.unshift(record);
      // 依次递归寻找父路由记录
      record = record.parent;
    }
  }

  return {
    matched,
    ...location,
  };
}

export class BaseHistory {
  constructor(router) {
    this.router = router;
    // 表示当前路由对象 初始化时会赋予 / 未匹配任何路由
    this.current = createRoute(null, {
      path: '/',
    });
  }

  // 核心跳转方法
  transitionTo(location, onComplete) {
    // 寻找即将跳转路径匹配到的路由对象
    const route = this.router.matcher.match(location);
    // 禁止重复跳转
    if (
      this.current.path === route.path &&
      route.matched.length === this.current.matched.length
    ) {
      // 这里不仅仅判断了前后的path是否一致
      // 同时判断了匹配路由对象的个数
      // 这是因为在首次初始化时 this.current 的值为 { path:'/',matched:[] }
      // 假如我们打开页面同样为 / 路径时，此时如果单纯判断path那么就会造成无法渲染
      return;
    }

    this.updateRoute(route);
    onComplete && onComplete(route);
  }

  // current改变同步修改$route
  listen(cb) {
    this.cb = cb;
  }

  // 更新current的值
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }
}
