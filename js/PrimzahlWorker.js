onmessage = function(e) {
  if (e.data === 2n) {
    return true;
  }
  for (let i = 2n; i < e.data; i++) {
    if (e.data % i === 0n) {
      postMessage(false);
    }
  }
  postMessage(e.data);
}
