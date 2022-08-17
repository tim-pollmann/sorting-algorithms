var g=Object.defineProperty;var E=(o,i,t)=>i in o?g(o,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[i]=t;var c=(o,i,t)=>(E(o,typeof i!="symbol"?i+"":i,t),t);const v=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}};v();class p extends HTMLDivElement{constructor(t){super();c(this,"value");c(this,"setFinished",()=>{this.className="array-element finished"});c(this,"setHighlighted",()=>{this.className="array-element highlighted"});c(this,"resetColor",()=>{this.className="array-element standard"});this.value=t,this.className="array-element standard",this.style.height=`${t.toString()}%`}}const u=async o=>new Promise(i=>{setTimeout(i,o)}),y={slow:50,medium:25,fast:0};class f extends HTMLDivElement{constructor(){super();c(this,"speed");c(this,"insertBeforeArrayElement",(t,s)=>{this.insertBefore(this.children[t],this.children[s])});c(this,"swapWithLowerArrayElement",t=>{this.insertBefore(this.children[t],this.children[t-1])});c(this,"swapArrayElements",(t,s)=>{const e=this.children[t],r=this.children[s],n=document.createElement("div"),l=document.createElement("div");this.replaceChild(n,e),this.replaceChild(l,r),this.replaceChild(r,n),this.replaceChild(e,l)});c(this,"resetColors",()=>{for(let t=0;t<this.children.length;t++)this.children[t].resetColor()});c(this,"bubbleSort",async()=>{this.children[0].setHighlighted();for(let e=this.children.length;e>1;e--){for(let r=0;r<e-1;r++){const n=this.children[r],l=this.children[r+1];l.value<n.value?this.swapWithLowerArrayElement(r+1):(n.resetColor(),l.setHighlighted()),await u(y[this.speed])}this.children[e-1].setFinished()}this.children[0].setFinished()});c(this,"mergeSort",async()=>{const t=async(e,r,n)=>{let l=r,a=e,h=r+1;for(;a<=l&&h<=n;){const d=this.children[a],m=this.children[h];d.setHighlighted(),m.setHighlighted(),await u(y[this.speed]),d.value<=m.value?a++:(this.insertBeforeArrayElement(h,a),h++,a++,l++),d.resetColor(),m.resetColor(),e===0&&n===this.children.length-1&&this.children[a-1].setFinished()}},s=async(e,r)=>{if(e<r){const n=Math.floor((e+r)/2);await s(e,n),await s(n+1,r),await t(e,n,r)}};await s(0,this.children.length-1);for(let e=0;e<this.children.length;e++)this.children[e].setFinished()});c(this,"insertionSort",async()=>{for(let t=1;t<this.children.length;t++){const s=this.children[t];s.setHighlighted();let e=t;do{await u(y[this.speed]);const r=this.children[e-1];if(s.value>r.value)break;this.swapWithLowerArrayElement(e),e--}while(e>0);s.resetColor()}});this.id="visualizer",this.speed="medium"}generateArray(t){this.innerHTML="";const s=Array.from({length:t},()=>new p(Math.floor(Math.random()*100)+1));for(const e of s)this.append(e)}setSpeed(t){this.speed=t}}const w=()=>{customElements.define("please-do-not-use",p,{extends:"div"}),customElements.define("please-do-not-use-either",f,{extends:"div"});const o=document.getElementById("app"),i=document.getElementById("startButton"),t=document.getElementsByName("algorithm"),s=document.getElementById("arraySize"),e=document.getElementsByName("speed"),r=document.getElementById("toolbar"),n=document.getElementById("generateArrayButton");if(o==null||i==null||t==null||s==null||e==null||r==null||n==null)return;const l=new f;o.appendChild(l),l.generateArray(parseInt(s.value,10)),i.addEventListener("click",async()=>{r.className="disabled",l.resetColors();for(let a=0;a<e.length;a++){const h=e[a];if(h.checked){l.setSpeed(h.value);break}}for(let a=0;a<t.length;a++){const h=t[a];if(h.checked){switch(h.value){case"insertionSort":await l.insertionSort();break;case"selectionSort":break;case"bubbleSort":await l.bubbleSort();break;case"quickSort":break;case"mergeSort":await l.mergeSort();break}break}}r.className=""}),s.addEventListener("input",()=>{l.generateArray(parseInt(s.value,10))}),n.addEventListener("click",()=>{l.generateArray(parseInt(s.value,10))})};w();
