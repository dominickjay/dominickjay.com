if (typeof registerPaint !== "undefined") {
  registerPaint('slanted-bg', class {
    paint (ctx, geom, properties, args) {
      ctx.fillStyle = 'hsl(296,100%,50%)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(geom.width, 0);
      ctx.lineTo(geom.width - 20, geom.height);
      ctx.lineTo(0, geom.height);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.beginPath();
      ctx.moveTo(0, geom.height);
      ctx.lineTo(geom.width, geom.height - 12);
      ctx.lineTo(geom.width, geom.height);
      ctx.fill();
    }
  });
}
