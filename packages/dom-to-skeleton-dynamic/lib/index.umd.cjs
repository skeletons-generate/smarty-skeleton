(function(T,E){typeof exports=="object"&&typeof module<"u"?module.exports=E():typeof define=="function"&&define.amd?define(E):(T=typeof globalThis<"u"?globalThis:T||self,T.index=E())})(this,function(){"use strict";const T=Math.floor(16.666666666666668);function E(u,b){const w=new MessageChannel,d=w.port1,C=w.port2,x=b&&b.timeout||-1;let f=u,S=0;const I=performance.now();let m=0;const M=h=>{S=h+T,f&&d.postMessage("task")};return C.onmessage=()=>{const h=()=>{const g=S-performance.now();return g>0?g:0};let k=!1;if(x>0&&(k=performance.now()-I>x),!!f){if(h()<=1&&!k){m=requestAnimationFrame(M);return}f({didTimeout:k,timeRemaining:h}),f=null}},m=requestAnimationFrame(M),m}const B=typeof requestIdleCallback=="function"?requestIdleCallback:E;function D(u){console.log(u,"root99999",u&&u.id,u);let b=[{node:u,skeId:u.id,pid:0}],w=!1,d=[],C="",x="",f=function(e){const{w:t,h:o,x:r,y:n}=e;return["position: fixed",`width:${t}%`,`height:${o}%`,`left:${r}%`,`top:${n}%`]},S=function(e){if(e.nodeType!==Node.ELEMENT_NODE)return;const t=window.getComputedStyle(e);return t.background!=="rgba(0, 0, 0, 0)"||t.backgroundImage!=="none"||t.backgroundColor!=="rgba(0, 0, 0, 0)"},I=function(e){if(e.nodeType!==Node.ELEMENT_NODE)return;const t=window.getComputedStyle(e);return t.borderTopColor!=="rgba(0, 0, 0, 0)"||t.borderRightColor!=="rgba(0, 0, 0, 0)"||t.borderBottomColor!=="rgba(0, 0, 0, 0)"||t.borderLeftColor!=="rgba(0, 0, 0, 0)"||t.borderTopWidth!=="0px"||t.borderRightWidth!=="0px"||t.borderBottomWidth!=="0px"||t.borderLeftWidth!=="0px"||t.borderTopStyle!=="none"||t.borderRightStyle!=="none"||t.borderBottomStyle!=="none"||t.borderLeftStyle!=="none"},m=function(e,t){let{width:o,height:r,top:n,left:s}=e.getBoundingClientRect();const{innerWidth:a,innerHeight:i}=window;return o>5&&r>5&&n<i&&s<a&&s+o<a?(o=Number((o/a*100).toFixed(2)),r=Number((r/i*100).toFixed(2)),s=Number((s/a*100).toFixed(2)),n=Number((n/i*100).toFixed(2)),{w:o,h:r,y:n,x:s}):null},M=function({node:e,skeId:t}){const o=m(e);if(!o)return null;const r=t||"",{borderRadius:n,background:s,backgroundColor:a}=getComputedStyle(e,null),l=f(o).concat([`background-color:${a}`,`border-radius:${n}`]).join(";");C+=`<div data-ske-id="${r}" style="${l}"></div>`},h=function({node:e,skeId:t}){const o=m(e);if(!o)return null;const r=t||"",n=f(o),{borderRadius:s,backgroundColor:a,borderWidth:i,borderStyle:l,borderColor:c}=getComputedStyle(e,null),p=n.concat([`background-color:${a}`,`border-radius:${s}`]).concat([`border-width:${i}`,`border-style:${l}`,"border-color:#f4f4f4",`border-radius:${s}`]).join(";");x+=`<div  data-ske-id="${r}" style="${p}"></div>`},k=function({node:e,skeId:t,pid:o,position:r}){const{borderRadius:n}=getComputedStyle(e,null),s={position:r,pid:o,skeId:t,borderRadius:n};if(!d.length){d.push(s);return}const a=d[d.length-1],{w:i,h:l,x:c,y:p}=a.position,{borderRadius:G}=a,{w:j,h:q,x:y,y:N}=r,v=Math.abs(c+i-y),R=Math.abs(p+l-N);if(console.log(e.parentElement.className,c+i-y,p+l-N,c,i,p,l,v,R,y,N,"xGapYgap",o,a.pid),(v<.5||R<.5)&&o==a.pid){let H={x:Math.min(c,y),y:Math.min(p,N),w:Math.max(c+i,y+j)-Math.min(c,y),h:Math.max(p+l,N+q)-Math.min(p,N)};d[d.length-1]={position:H,borderRadius:Math.max(G,n),skeId:t,pid:o};return}d.push(s)},g=function({node:e,skeId:t,pid:o,isText:r}){if(!e)return;const n=m(e);n&&k({node:e,skeId:t,pid:o,position:n})},A=function({node:e,skeId:t,pid:o}){e.nodeType===Node.ELEMENT_NODE?e&&g({node:e,skeId:t,pid:o}):e.nodeType===Node.TEXT_NODE?e&&g({node:e.parentElement,skeId:t,pid:o}):(e.nodeType,Node.COMMENT_NODE)},L=function({node:e}){let t=!1;return e.nodeType!=Node.ELEMENT_NODE||(e.childNodes&&Array.from(e.childNodes).some(o=>o.nodeType===Node.TEXT_NODE)&&(t=!0),e.tagName==="svg"&&(t=!0),e.tagName==="A"&&(t=!0),(e.tagName==="IMG"||/base64/.test(e.src)||e.tagName==="FIGURE")&&(t=!0),(e.tagName==="INPUT"||e.tagName=="TEXTAREA")&&(t=!0),e.tagName==="CANVAS"&&(t=!0),e.nodeType===Node.ELEMENT_NODE&&(e.tagName==="BUTTON"||e.tagName==="A"&&e.getAttribute("role")==="button")&&(t=!0)),t},O=function(e){const t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"&&e.offsetWidth>0&&e.offsetHeight>0},_=function({node:e,skeId:t,pid:o}){if(!e||w||!O(e))return;if(e.childNodes&&Array.from(e.childNodes).some(i=>i.nodeType===Node.TEXT_NODE)){g({node:e,skeId:t,pid:o,isText:!0});return}if(L({node:e})){g({node:e,skeId:t,pid:o});return}if(S(e)&&M({node:e,skeId:t}),I(e)&&h({node:e,skeId:t}),!e.hasChildNodes){A({node:e,skeId:t,pid:o});return}const s=e.childNodes,a=o++;for(let i=0;i<s.length;i++){const l=s[i],c=t+l.id;b.push({node:l,skeId:c,pid:a})}},F=function(){console.log(d,"SkeBoxes");const e=d.reduce((o,r)=>{const{skeId:n,position:s,borderRadius:a}=r,l=f(s).concat([`border-radius:${a}`]);return o+`<div data-ske-id="${n||""}" class="skeleton-common" 
    style="${l.join(";")}" ></div>`},""),t=C+x+e;return console.log(t,"skesskes"),W(t),V(),t};function W(e){if(!e)return;const t=document.createElement("div");t.style.position="fixed",t.style.zIndex="1000000",t.innerHTML=e,document.body.append(t)}function V(){const e=document.createElement("style");e.innerHTML=`.skeleton-common {
  position: fixed;
  background:#e9e9e9 linear-gradient(90deg, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.06) 63%);
  background-size: 400% 100%;
  animation-name: loading;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
`,document.head.append(e)}let $=function(){if(b.length===0){F();return}B(e=>{let t;for(;(t=b.shift())&&!e.didTimeout&&e.timeRemaining()>0;)_(t);$()})};$()}return D});
