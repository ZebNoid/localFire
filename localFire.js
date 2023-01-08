const localFire = (() => {
  let host = window.location.hostname;
  const w3 = 'www.';
  if (host.startsWith(w3)) host = host.slice(w3.length);
  const KEY = `localFire:${[...host].reverse().join('')}`;

  const on = (fn) => {
      let invoke = () => { };
      if (fn instanceof Function) invoke = fn;
      window.addEventListener('storage', event => {
          if (KEY !== event.key) return;
          const { data, ...other } = JSON.parse(localStorage.getItem(KEY));
          invoke(data);
      });
  };

  const send = (data) => {
      localStorage.setItem(KEY, JSON.stringify({ data, date: new Date() }));
  };

  return { on, send };
})();