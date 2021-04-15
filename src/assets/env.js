const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

(function(window) {
    window["env"] = window["env"] || {};
  
    console.log(isLocalhost);
    var hostname = "intranet-api.jack.mylocal"; //window.location.hostname + "/api";
    console.log(hostname);
    // Environment variables
    window["env"]["apiUrl"] = isLocalhost ? "localhost:9090" : hostname;


    window["env"]["debug"] = true;
  })(this);