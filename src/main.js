
/*Houdini Ripple Effect*/
if (!CSS.paintWorklet) {
    document.body.innerHTML("PaintWorklet not supported by this browser");
  }

   // Paint Worklet  https://github.com/GoogleChromeLabs/houdini-samples/blob/master/paint-worklet/ripple/index.html //
  
   async function init() {
    await CSS.paintWorklet.addModule(
      "https://cdn.jsdelivr.net/gh/GoogleChromeLabs/houdini-samples/paint-worklet/ripple/paintworklet.js"
    );

    const navbar = document.querySelector("#navbar");
    let start = performance.now();
    let x, y;

    document.querySelector("#navbar").addEventListener("click", evt => {
       navbar.classList.add("animating");
      [x, y] = [evt.clientX, evt.clientY];
      start = performance.now();
      requestAnimationFrame(function raf(now) {
        const count = Math.floor(now - start);
        navbar.style.cssText = `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${count};`;
        if (count > 1000) {
            navbar.classList.remove("animating");
            navbar.style.cssText = `--animation-tick: 0`;
          return;
        }
        requestAnimationFrame(raf);
      });
    });
  }
  init();