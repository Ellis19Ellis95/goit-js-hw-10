var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in d)return d[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return d[e]=o,n.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,d){t[e]=d},e.parcelRequired7c6=n);var o=n("9dxg1");axios.defaults.headers.common["x-api-key"]="live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g";const r=document.querySelector(".breed-select"),c=document.querySelector(".loader"),i=document.querySelector(".error"),a=document.querySelector(".cat-info"),l=document.querySelector(".breed-name"),s=document.querySelector(".description"),u=document.querySelector(".temperament"),p=document.querySelector(".cat-image");function m(){c.classList.add("hidden"),i.classList.remove("hidden")}function h(){c.classList.remove("hidden"),i.classList.add("hidden"),a.classList.add("hidden")}window.addEventListener("DOMContentLoaded",(()=>{h(),(0,o.fetchBreeds)().then((e=>{!function(e){e.forEach((e=>{const d=document.createElement("option");d.value=e.id,d.textContent=e.name,r.appendChild(d)}))}(e),c.classList.add("hidden"),r.classList.remove("hidden")})).catch((()=>{m()}))})),r.addEventListener("change",(()=>{h();const e=r.value;(0,o.fetchCatByBreed)(e).then((e=>{!function(e){l.textContent=e.breeds[0].name,s.textContent=e.breeds[0].description,u.textContent=e.breeds[0].temperament,p.src=e.url}(e),a.classList.remove("hidden")})).catch((()=>{m()}))})),document.body.appendChild(r),document.body.appendChild(c),document.body.appendChild(i),document.body.appendChild(a),a.appendChild(l),a.appendChild(s),a.appendChild(u),a.appendChild(p);
//# sourceMappingURL=index.a877d4dd.js.map
