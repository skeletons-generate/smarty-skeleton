(function(r,a){typeof exports=="object"&&typeof module<"u"?module.exports=a(require("react")):typeof define=="function"&&define.amd?define(["react"],a):(r=typeof globalThis<"u"?globalThis:r||self,r.index=a())})(this,function(){"use strict";const r=Math.floor(16.666666666666668);function a(i,e){const t=new MessageChannel,s=t.port1,n=t.port2,c=e&&e.timeout||-1;let o=i,h=0;const b=performance.now();let u=0;const f=l=>{h=l+r,o&&s.postMessage("task")};return n.onmessage=()=>{const l=()=>{const N=h-performance.now();return N>0?N:0};let d=!1;if(c>0&&(d=performance.now()-b>c),!!o){if(l()<=1&&!d){u=requestAnimationFrame(f);return}o({didTimeout:d,timeRemaining:l}),o=null}},u=requestAnimationFrame(f),u}const g=typeof requestIdleCallback=="function"?requestIdleCallback:a;function p(i,e){document.body.appendChild(i),document.head.insertBefore("");const s=window.location.origin+window.location.pathname+"-"+e;localStorage.setItem(s,JSON.stringify(i&&i.outerHTML))}class m{constructor({targetNode:e,config:t={}}){this.targetNode=e.cloneNode(!0),this.nodeQueue=[this.targetNode],this.isInterrupted=!1,this.id=this.targetNode.id,this.config=t,this.minWidth=t.minWidth||10,this.minHeight=t.minHeight||10,this.minGap=t.minGap||.5,this.defaultBgColor=t.defaultBgColor}interrupt(){this.isInterrupted=!0}saveSkeleton(){this.isInterrupted||p(this.targetNode,this.id)}isBackgroundSet(e){if(e.nodeType!==Node.ELEMENT_NODE)return;const t=window.getComputedStyle(e);return t.background!=="rgba(0, 0, 0, 0)"||t.backgroundImage!=="none"||t.backgroundColor!=="rgba(0, 0, 0, 0)"}handleLeafNode(e){e.nodeType===Node.ELEMENT_NODE?e&&this.addClassNames(e,["ske-bg"]):e.nodeType===Node.TEXT_NODE?e&&this.addClassNames(e.parentElement,["ske-bg"]):(e.nodeType,Node.COMMENT_NODE)}addClassNames(e,t){Array.from(e.parentElement.classList||[]).includes("ske-bg")||e.classList.add(...t)}handleIsInEnumableTags(e){let t=!1;if(e.nodeType!==Node.ELEMENT_NODE)return t;if(e.childNodes&&Array.from(e.childNodes).some(s=>s.nodeType===Node.TEXT_NODE&&!!s.nodeValue.trim())){this.addClassNames(e,["ske-bg"]);const s=getComputedStyle(e);e.style.display=s.display,t=!0}if(["SVG"].includes(e.tagName.toUpperCase())&&(this.addClassNames(e,["ske-bg"]),e.innerHTML="",t=!0),["I","TH","TD","A","CANVAS"].includes(e.tagName.toUpperCase())&&(this.addClassNames(e,["ske-bg"]),t=!0),(e.tagName==="IMG"||/base64/.test(e.src)||e.tagName==="FIGURE")&&(e.removeAttribute("src"),this.addClassNames(e,["ske-bg","ske-btn"]),t=!0),e.tagName==="SPAN"){this.addClassNames(e,["ske-bg"]);const s=getComputedStyle(e);e.style.display=s.display,t=!0}return["LABEL","INPUT"].includes(e.tagName)&&(this.addClassNames(e,["ske-bg","ske-input"]),t=!0),e.nodeType===Node.ELEMENT_NODE&&(e.tagName==="BUTTON"||e.tagName==="A"&&e.getAttribute("role")==="button")&&(this.addClassNames(e,["ske-bg","ske-btn"]),t=!0),e.tagName==="TEXTAREA"&&(this.addClassNames(e,["ske-bg","ske-btn"]),t=!0),t}getIsVisible(e){const t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}performTraverseNode(e){if(!e||this.isInterrupted||e.nodeType!==Node.ELEMENT_NODE||!this.getIsVisible(e))return;if(this.handleIsInEnumableTags(e),!e.hasChildNodes){this.handleLeafNode(e);return}const s=e.childNodes;for(let n=0;n<s.length;n++)this.nodeQueue.push(s[n])}performWorkUnit(){if(!this.isInterrupted){if(this.nodeQueue.length===0){this.saveSkeleton();return}g(e=>{for(console.log(e,"deadline123");this.nodeQueue.length&&!e.didTimeout&&e.timeRemaining()>0;){const t=this.nodeQueue.shift();this.performTraverseNode(t)}this.performWorkUnit()})}}}return m=i=>{const e=document.getElementById(i);e&&new m({targetNode:e}).performWorkUnit()}});
