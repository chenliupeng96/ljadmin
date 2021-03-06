let routes = [
  {
    path: "/",
    name: "layout",
    redirect:{name: 'index'},
    component: 'layout',
    children:[
      {
        meta:{title:'后台首页'},
        component:'index/index'
      },
      {
        meta:{title:'商品列表'},
        component:'shop/goods/list'
      },
      {
        meta:{title:"相册管理"},
        component:'image/index'
      }
    ]
  },
  {

    meta:{title:'登录页'},
    component:'login/index'
  },
  {
    path:'*',
    redirect:{name:'index'}
  }
];

// 去除index
let getValue= function(str) {
  // str = login/index
  // 获取最后一个/的索引
  let index = str.lastIndexOf('/');
  // 获取最后一个/后面的值
  let val = str.substring(index+1,str.length);
  if(val === 'index'){
    return str.substring(index,-1)
  }
  return str;
}

// 自动生成路由
let createRouter = function(arr){
  arr.forEach(item => {
    if(!item.component) return;
    // 去除index
    let val = getValue(item.component);
    //生成name
    item.name = item.name || val.replace(/\//g,'_');
    //生成path
    item.path = item.path ||  `/${val}`;
    // 自动生成component
    let componentFun = import(`../../views/${item.component}.vue`);
    item.component = () => componentFun
    // 判断他是否有子路由
    if(item.children && item.children.length > 0){
      createRouter(item.children)
    }
  });
}
// 获取路由信息方法
let getRoutes = function(){
  createRouter(routes)
  return routes;
}



export default getRoutes();