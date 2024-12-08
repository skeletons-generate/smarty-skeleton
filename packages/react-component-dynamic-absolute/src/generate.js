import { idleCallback } from "./idle-callback";
import localforage from "localforage";
export default class generateSkeleton {
  constructor({ root, config = {} }) {
    this.nodeQueue = [{ node: root, skeId: root.id, pid: 0 }]; //skeId用于隐藏,pid用于合并重叠的div块
    this.isInterrupted = false;
    this.SkeBoxes = []; //position skeId,pid
    this.Bgs = "";
    this.Borders = "";
    const {
      width: RW,
      height: RH,
      top: RT,
      left: RL,
    } = root.getBoundingClientRect(); //按比例的参照物
    this.minW = config.minW || RW; //用于生成box
    this.maxW = config.maxW || 1600;
    this.minH = config.minH || RH;
    const path = window.location.origin + window.location.pathname;
    const key = path + "-" + id;
    this.cacheKey = key;
  }

  getPositionStyles = function (position) {
    const { w, h, x, y } = position;
    return [
      "position: absolute",
      `width:${w}%`,
      `height:${h}%`,
      `left:${x}%`,
      `top:${y}%`,
    ];
  };

  isBackgroundSet = function (node) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const style = window.getComputedStyle(node);
    return (
      style.background !== "rgba(0, 0, 0, 0)" ||
      style.backgroundImage !== "none" ||
      style.backgroundColor !== "rgba(0, 0, 0, 0)"
    );
  };

  hasBorder = function (node) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const style = window.getComputedStyle(node);
    return (
      style.borderTopColor !== "rgba(0, 0, 0, 0)" || // 或者其他非transparent的颜色
      style.borderRightColor !== "rgba(0, 0, 0, 0)" ||
      style.borderBottomColor !== "rgba(0, 0, 0, 0)" ||
      style.borderLeftColor !== "rgba(0, 0, 0, 0)" ||
      style.borderTopWidth !== "0px" ||
      style.borderRightWidth !== "0px" ||
      style.borderBottomWidth !== "0px" ||
      style.borderLeftWidth !== "0px" ||
      style.borderTopStyle !== "none" ||
      style.borderRightStyle !== "none" ||
      style.borderBottomStyle !== "none" ||
      style.borderLeftStyle !== "none"
    );
  };

  getPosition = function (node, isBlock) {
    let { width, height, top, left } = node.getBoundingClientRect();
    // 必须符合要求的元素才渲染：有大小，并且在视图内;
    if (
      width > 5 &&
      height > 5 &&
      top < RT &&
      left < RL &&
      left + width < RL + RW
    ) {
      width = Number(((width / RW) * 100).toFixed(2));
      height = Number(((height / RH) * 100).toFixed(2));
      left = Number((((left - RL) / RW) * 100).toFixed(2));
      top = Number((((top - RT) / RH) * 100).toFixed(2));
      return { w: width, h: height, y: top, x: left };
    }
    return null;
  };

  addBgs = function ({ node, skeId }) {
    const positionInfo = this.getPosition(node);
    if (!positionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const { borderRadius, background, backgroundColor } = getComputedStyle(
      node,
      null
    );
    const positionStyles = this.getPositionStyles(positionInfo);
    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");
    this.Bgs += `<div data-ske-id="${nodeId}" style="${stylesInfo}"></div>`;
  };

  addBorders = function ({ node, skeId }) {
    const positionInfo = this.getPosition(node);
    if (!positionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const positionStyles = this.getPositionStyles(positionInfo);
    const {
      borderRadius,
      backgroundColor,
      borderWidth,
      borderStyle,
      borderColor, //变成灰色系列
    } = getComputedStyle(node, null);
    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .concat([
        `border-width:${borderWidth}`,
        `border-style:${borderStyle}`,
        `border-color:#f4f4f4`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");

    this.Borders += `<div  data-ske-id="${nodeId}" style="${stylesInfo}"></div>`;
  };

  mergeDiv = function ({ node, skeId, pid, position }) {
    const { borderRadius } = getComputedStyle(node, null);
    const newNodeInfo = {
      position,
      pid,
      skeId,
      borderRadius,
    };
    if (!this.SkeBoxes.length) {
      this.SkeBoxes.push(newNodeInfo);
      return;
    }
    const previousDivInfo = this.SkeBoxes[this.SkeBoxes.length - 1];
    const { w: w1, h: h1, x: x1, y: y1 } = previousDivInfo.position;
    const { borderRadius: borderRadius1 } = previousDivInfo;
    const { w: w2, h: h2, x: x2, y: y2 } = position;
    //     // 计算重叠度
    //     const xOverlap = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2));
    //     const yOverlap = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2));
    //     const overlap =
    //       (xOverlap * yOverlap) / (w1 * h1 + w2 * h2 - xOverlap * yOverlap);
    const xGap = Math.abs(x1 + w1 - x2);
    const yGap = Math.abs(y1 + h1 - y2);
    if ((xGap < 0.5 || yGap < 0.5) && pid == previousDivInfo.pid) {
      //相同层级
      // 合并节点
      let n1 = {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        w: Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2),
        h: Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2),
      };
      this.SkeBoxes[SkeBoxes.length - 1] = {
        position: n1,
        borderRadius: Math.max(borderRadius1, borderRadius), //都使用第一个borderRaduis
        skeId,
        pid,
      };
      return;
    }
    this.SkeBoxes.push(newNodeInfo);
  };

  createDiv = function ({ node, skeId, pid, isText }) {
    if (!node) {
      return;
    }
    const positionInfo = this.getPosition(node, isText);
    if (!positionInfo) {
      return;
    }
    //合并灰色的块
    this.mergeDiv({ node, skeId, pid, position: positionInfo });
  };

  handleLeafNode = function ({ node, skeId, pid }) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node && this.createDiv({ node, skeId, pid });
    } else if (node.nodeType === Node.TEXT_NODE) {
      node && this.createDiv({ node: node.parentElement, skeId, pid }); //创建父元素的块 但是使用的是子元素的ids
    } else if (node.nodeType === Node.COMMENT_NODE) {
      //注释
    }
  };

  handleIsInEnumableTags = function ({ node }) {
    let reg = false;
    // 将所有拥有 textChildNode 子元素的元素的文字颜色设置成背景色，这样就不会在显示文字了。
    if (node.nodeType != Node.ELEMENT_NODE) {
      return reg;
    }
    if (
      node.childNodes &&
      Array.from(node.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)
    ) {
      reg = true;
    }
    // 隐藏所有 svg 元素
    if (node.tagName === "svg") {
      reg = true;
    }

    if (node.tagName === "A") {
      reg = true;
    }

    if (
      node.tagName === "IMG" ||
      /base64/.test(node.src) ||
      node.tagName === "FIGURE"
    ) {
      reg = true;
    }

    // 输入框元素
    if (node.tagName === "INPUT" || node.tagName == "TEXTAREA") {
      reg = true;
    }

    // CANVAS
    if (node.tagName === "CANVAS") {
      reg = true;
    }

    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node.tagName === "BUTTON" ||
        (node.tagName === "A" && node.getAttribute("role") === "button"))
    ) {
      reg = true;
    }
    return reg;
  };

  getIsVisible = function (node) {
    const style = window.getComputedStyle(node);
    const isVisible =
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      node.offsetWidth > 0 &&
      node.offsetHeight > 0;
    return isVisible;
  };

  performTraverseNode = function ({ node, skeId, pid }) {
    if (!node || isInterrupted) {
      return;
    }
    const isVisible = this.getIsVisible(node);
    if (!isVisible) {
      return;
    }
    if (
      node.childNodes &&
      Array.from(node.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)
    ) {
      this.createDiv({ node, skeId, pid, isText: true });
      return;
    }
    //如果是一些特殊Tag 或者特殊的case 可以直接创建灰色块 不需要再进行递归
    const isInEnumableTags = this.handleIsInEnumableTags({ node });
    if (isInEnumableTags) {
      this.createDiv({ node, skeId, pid, isInEnumableTags });
      return;
    }

    //添加背景块
    if (this.isBackgroundSet(node)) {
      this.addBgs({ node, skeId });
    }
    if (this.hasBorder(node)) {
      this.addBorders({ node, skeId });
    }
    //添加线条

    //是继续遍历还是创建灰色块
    if (!node.hasChildNodes) {
      this.handleLeafNode({ node, skeId, pid });
      return;
    }

    //否则就往队列里面加node
    const children = node.childNodes;
    const currentPid = pid++;
    for (let i = 0; i < children.length; i++) {
      const currentNode = children[i];
      const newSkeId = skeId + currentNode.id;
      this.nodeQueue.push({
        node: currentNode,
        skeId: newSkeId,
        pid: currentPid,
      });
    }
  };

  saveSke = function () {
    if (this.isInterrupted) {
      return;
    }

    const blocks = this.SkeBoxes.reduce((pre, next) => {
      const { skeId, position, borderRadius } = next;
      const positionStyles = this.getPositionStyles(position);
      const stylesInfo = positionStyles.concat([
        `border-radius:${borderRadius}`,
      ]);
      return (
        pre +
        `<div data-ske-id="${skeId || ""}" class="skeleton-common" 
        style="${stylesInfo.join(";")}" ></div>`
      );
    }, "");

    const skes = this.Bgs + this.Borders + blocks;
    const appendDiv = document.createElement("div");
    appendDiv.style.position = "relative";
    appendDiv.style.minWidth = `${this.minW}px`;
    appendDiv.style.minHeight = `${this.minH}px`;
    appendDiv.style.maxWidth = `${this.maxW}px`;
    appendDiv.innerHTML = skes;
    this.putCacheDOM(appendDiv);
    this.insertCacheDOM(appendDiv);
    this.insertCss();
    return skes;
  };

  putCacheDOM(cacheDOM) {
    if (!cacheDOM) return;
    localforage
      .setItem(
        `${this.cacheKey}`,
        JSON.stringify(cacheDOM && cacheDOM.outerHTML)
      )
      .then(function () {
        // return localforage.getItem(this.cacheKey);
      });
  }

  insertCacheDOM(cacheDOM) {
    if (!cacheDOM) {
      return;
    }
    document.body.append(appendDiv);
  }

  insertCss() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `.skeleton-common {
      position: absolute;
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
    `;
    document.head.append(styleTag);
  }

  performWorkUnit = function () {
    if (this.isInterrupted) {
      //如果中断直接返回
      return;
    }
    // 任务执行完毕后结束递归
    if (this.nodeQueue.length === 0) {
      //遍历完成
      this.saveSke();
      return;
    }

    idleCallback((deadline) => {
      let currentNodeInfo;
      while (
        (currentNodeInfo = this.nodeQueue.shift()) &&
        !deadline.didTimeout &&
        deadline.timeRemaining() > 0
      ) {
        this.performTraverseNode(currentNodeInfo);
      }
      this.performWorkUnit();
    });
  };
}

export function getCacheDOM({ id }) {
  const path = window.location.origin + window.location.pathname;
  const key = path + "-" + id;
  let cacheDOM;
  try {
    cacheDOM = JSON.parse(localforage.getItem(key) || "{}");
  } catch (e) {
    console.log(e);
  }
  return cacheDOM;
}
