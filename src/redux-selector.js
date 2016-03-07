export function storeSelector(store, item) {

  let obj = {};
  let name = '__redux__';


  if (!obj.hasOwnProperty(name)) {

    Object.defineProperty(obj, name, {
      writable: true,
      configurable: true,
      enumerable: true
    });
  }


  const update = () => {
    obj.__redux__ = Object.assign( obj, store.getState()[item]);
  };
  store.subscribe(update);
  update();

  return obj;
}
