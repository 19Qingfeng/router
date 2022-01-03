let _Vue;

export default function install(Vue) {
  // 如果已经安装过了
  if (install.installed && _Vue === Vue) return;

  // 首次调用Vue.use(VueRouter)时，将install.installed变为true
  install.installed = true;

  // 保存传入的Vue 提供给别的模块使用Vue
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 如果当前options存在router对象 表示该实例是根对象
        this._rootRouter = this;
        this._rootRouter._router = this.$options.router;
      } else {
        // 非根组件实例
        this._rootRouter = this.$parent && this.$parent._rootRouter;
      }
    },
  });

  // 注册组件
  // Vue.component('router-link', Link);
  // Vue.component('router-view', View);

  // 定义原型$router对象
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._rootRouter._router;
    },
  });

  // 定义原型$route对象
  // to do ...
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return {};
    },
  });
}
