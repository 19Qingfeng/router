import createRouteMap from './create-router-map';
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
    // 判断第一个参数是否传递了string 如果传递了string 那么就是指定了当前需要添加到的parent名称
    const parent =
      typeof parentOrRoute !== 'object' ? nameMap[parentOrRoute] : undefined;
    return createMatcher(
      [route || parentOrRoute],
      pathList,
      pathMap,
      nameMap,
      parent
    );
  }

  // 动态注册多个路由
  function addRoutes(routes) {
    return createMatcher(routes, pathList, pathMap, nameMap);
  }

  // 获取当前所有活跃的路由记录
  function getRoutes() {
    return pathList.map((path) => pathMap[path]);
  }

  // TODO:通过路径寻找当前路径匹配的所有record记录
  function match() {
    // do something
  }

  return {
    addRoute,
    addRoutes,
    getRoutes,
    match,
  };
}
