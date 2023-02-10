export async function ymport (path : string) : Promise<any> {
  return new Promise((resolve, reject) => {
    import(path)
      .then(res => {
        clearCache(path);
        resolve(res);
      }).catch(reject);
  });
}

function clearCache (modulePath : string) : void {
  require.cache[modulePath].loaded = false;
  require.cache[modulePath]?.children.forEach(child => { if(child.loaded) clearCache(child.filename); });

  delete require.cache[modulePath];
}
