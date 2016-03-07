export function storeSelector(store, item) {

  let obj = {};
  let name = '__redux__';

  Object.defineProperty(obj, name, {
    writable: true,
    configurable: true,
    enumerable: false
  });

  const update = () => { obj.__redux__ = Object.assign( obj, store.getState()[item]); };
  store.subscribe(update);
  update();

  return obj;
}
