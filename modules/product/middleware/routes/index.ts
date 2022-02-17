export default ({ store, redirect, app, params, query, route }:any) =>{
  console.log('product==> : test middleware')
  if (app.context.from &&
      app.context.from.query.theme == 'custom' &&
      !route.query.theme) {
      route.query.theme = "custom"
      app.context.next(route)
  }
}