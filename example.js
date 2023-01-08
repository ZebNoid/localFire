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


// find button with new site hostname
const inject = () => {
    const sel = 'a.btnx.btn-red';
    const btn = document.querySelector(sel);
    if (!btn) return;
    console.info(`selector: ${sel}`);
    const newHost = btn.getAttribute("href");
    btn.innerText = 'sync GO !';
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        // pass site new hostname
        localFire.send(newHost);
        openUrl(newHost);
    }, false);
}

const openUrl = (href) => {
    const uri = window.location.pathname + window.location.search;
    // open hostname with uri of current tab
    window.open(href + uri, "_self");
}


// init all
setTimeout(() => {
    localFire.on(href => {
        openUrl(href);
    });
    inject();
}, 100);

