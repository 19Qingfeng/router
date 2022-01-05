import createRouteMap from './create-router-map';
import { createRoute } from './history/base';
/**
 *
 *
 * @export
 * @param {*} routes 初始化时传入的路哟配置列表
 */
export function createMatcher(routes) {
  // 首先初始化需要格式化路由对象 将传入的路由列表进行扁平化
  const { pathList, pathMap, nameMap } = createRouteMap(routes);
  // 动态注册单个路由 本质上还是参数的重载
  // 当动态注册单个路由时 支持覆盖同名路由
  // 同时注册单个路由支持指定在特定的路由中添加子路由 支持parent参数
  function addRoute(parentOrRoute, route) {
    // 如果第一个参数传递了非Object对象，那么表示它不是路由对象 代表传递的是对应的parent路由的名称
    const parent =
      typeof parentOrRoute !== 'object' ? nameMap[parentOrRoute] : undefined;
    return createRouteMap(
      [route || parentOrRoute],
      pathList,
      pathMap,
      nameMap,
      parent
    );
  }

  // 动态注册多个路由
  function addRoutes(routes) {
    return createRouteMap(routes, pathList, pathMap, nameMap);
  }

  // 获取当前所有活跃的路由记录
  function getRoutes() {
    return pathList.map((path) => pathMap[path]);
  }

  // 通过路径寻找当前路径匹配的所有record记录
  function match(location) {
    const next = typeof location === 'string' ? { path: location } : location;
    const { name, path } = next;
    if (name) {
      const record = nameMap[name];
      // 如果没有匹配的路由记录
      if (!record) return createRoute(null, location);
      return createRoute(record, next);
    } else if (path) {
      const record = pathMap[path];
      if (!record) return createRoute(null, location);
      return createRoute(record, next);
    }
  }

  return {
    addRoute,
    addRoutes,
    getRoutes,
    match,
  };
}
