!function(){"use strict";var t="/smarty-skeleton/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"pnpm-monorepo","b":"webpack","f":[["nm__dumi__dist__client__pages__Demo__index.578aa5c0.chunk.css",9],["nm__dumi__dist__client__pages__Demo__index.bb5f818f.async.js",9],["nm__dumi__dist__client__pages__404.8b85f2d9.chunk.css",65],["nm__dumi__dist__client__pages__404.58d9f5d1.async.js",65],["204.e8c51481.chunk.css",204],["204.c7be7844.async.js",204],["dumi-docs__index.md.35449c13.async.js",215],["packages__component-with-fixed__src__Page1__index.md.de136dd0.async.js",341],["nm__dumi__theme-default__layouts__DocLayout__index.cfae6dc7.async.js",519],["dumi-docs__guide.md.2e58c70f.async.js",726],["dumi__tmp-production__dumi__theme__ContextWrapper.ec05c343.async.js",923]],"r":{"/*":[2,3,4,5,8,10],"/":[6,4,5,8,10],"/guide":[9,4,5,8,10],"/page1":[7,4,5,8,10],"/~demos/:id":[0,1,10],"/components/page1":[7,4,5,8,10]}},{publicPath:"/smarty-skeleton/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();