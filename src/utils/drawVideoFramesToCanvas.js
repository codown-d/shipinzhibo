export default (art) => {
//   const posterUrl = art.video.getAttribute("poster");
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: #000;
        filter: blur(25px);
        pointer-events: none;                                               
    `;
  const ctx = canvas.getContext("2d");
  const container = document.querySelector(
    `${art.option.container} .art-video-player`
  );
  container.appendChild(canvas);
//   art.on("loadeddata", () => {
//     canvas.width = art.video.videoWidth;
//     canvas.height = art.video.videoHeight;
//   });
  function drawFrame() {
    if (!art.video.paused && !art.video.ended) {
      ctx.drawImage(art.video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    }
  }
  requestAnimationFrame(drawFrame);
};
