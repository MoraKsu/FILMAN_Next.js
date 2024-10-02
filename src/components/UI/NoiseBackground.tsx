"use client";

import { useEffect } from 'react';

const NoiseBackground = () => {
  useEffect(() => {
    class Grain {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      patternCanvas: HTMLCanvasElement;
      patternCtx: CanvasRenderingContext2D;
      patternData: ImageData;
      patternSize: number;
      patternScaleX: number;
      patternScaleY: number;
      patternRefreshInterval: number;
      patternAlpha: number;
      patternPixelDataLength: number;
      frame: number;

      constructor(el: HTMLCanvasElement) {
        this.patternSize = 150;
        this.patternScaleX = 1;
        this.patternScaleY = 1;
        this.patternRefreshInterval = 3;
        this.patternAlpha = 50;

        this.canvas = el;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.ctx.scale(this.patternScaleX, this.patternScaleY);

        this.patternCanvas = document.createElement("canvas");
        this.patternCanvas.width = this.patternSize;
        this.patternCanvas.height = this.patternSize;
        this.patternCtx = this.patternCanvas.getContext("2d") as CanvasRenderingContext2D;
        this.patternData = this.patternCtx.createImageData(
          this.patternSize,
          this.patternSize
        );
        this.patternPixelDataLength = this.patternSize * this.patternSize * 4;

        this.resize = this.resize.bind(this);
        this.loop = this.loop.bind(this);

        this.frame = 0;

        window.addEventListener("resize", this.resize);
        this.resize();
        window.requestAnimationFrame(this.loop);
      }

      resize() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
      }

      update() {
        for (let i = 0; i < this.patternPixelDataLength; i += 4) {
          const value = Math.random() * 255;
          this.patternData.data[i] = value;
          this.patternData.data[i + 1] = value;
          this.patternData.data[i + 2] = value;
          this.patternData.data[i + 3] = this.patternAlpha;
        }

        this.patternCtx.putImageData(this.patternData, 0, 0);
      }

      draw() {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = this.ctx.createPattern(this.patternCanvas, "repeat")!;
        this.ctx.fillRect(0, 0, width, height);
      }

      loop() {
        if (++this.frame % this.patternRefreshInterval === 0) {
          this.update();
          this.draw();
        }
        window.requestAnimationFrame(this.loop);
      }
    }

    const canvas = document.querySelector(".grain") as HTMLCanvasElement;
    if (canvas) {
      new Grain(canvas);
    }
  }, []);

  return <canvas className="grain"></canvas>;
};

export default NoiseBackground;