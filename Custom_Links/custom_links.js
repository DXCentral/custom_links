/*!
 * ************************************************
 * FM-DX Webserver Custom Links Plugin
 * ************************************************
 * Created by Loyd Van Horn/DX Central
 * ************************************************
 * This plugin adds customizable buttons that open
 * external links inside a draggable iframe.
 * ************************************************
 */

/* ========== USER CONFIGURATION ========== */

const customLinksConfig = [
  {
    label: "Your Button Title Here",
    url: "https://www.enteryoururlhere.com"
  },
  {
    label: "Another Button Title",
    url: "https://www.anotherurl.com"
  }
];

/* ========== PLUGIN LOGIC ========== */

const pluginIdPrefix = "custom-links-btn";
let customIframeContainer = null;

function createCustomLinksIframe(url) {
  if (customIframeContainer) customIframeContainer.remove();

  customIframeContainer = document.createElement("div");
  customIframeContainer.style.position = "fixed";
  customIframeContainer.style.top = "50px";
  customIframeContainer.style.left = "50px";
  customIframeContainer.style.width = "640px";
  customIframeContainer.style.height = "480px";
  customIframeContainer.style.borderRadius = "12px";
  customIframeContainer.style.zIndex = "9999";
  customIframeContainer.style.backgroundColor = "#111";
  customIframeContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  customIframeContainer.style.overflow = "hidden";

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "10px";
  closeBtn.style.color = "white";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.zIndex = "10000";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.fontWeight = "bold";

  closeBtn.onclick = () => {
    if (customIframeContainer) {
      customIframeContainer.remove();
      customIframeContainer = null;
    }
  };

  customIframeContainer.appendChild(closeBtn);
  customIframeContainer.appendChild(iframe);
  document.body.appendChild(customIframeContainer);

  makeDraggable(customIframeContainer);
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.tagName === 'IFRAME' || e.target.innerText === '✕') return;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function initCustomLinksPlugin() {
  setTimeout(() => {
    customLinksConfig.forEach((link, index) => {
      const btnId = `${pluginIdPrefix}-${index}`;
      addIconToPluginPanel(btnId, link.label, "solid", "link", `Open ${link.label}`);
      const button = document.getElementById(btnId);
      if (button) {
        button.classList.add("hide-phone", "bg-color-2");
        button.onclick = () => createCustomLinksIframe(link.url);
      }
    });
  }, 1000);
}

document.addEventListener("DOMContentLoaded", initCustomLinksPlugin);
