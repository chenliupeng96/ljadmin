import Vue from "vue";
import Router from "vue-router";

import routes from './common/config/router';

Vue.use(Router);
// 解决elementui重复点击菜单报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes
});
