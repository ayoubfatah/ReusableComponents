"use client";
import React, { useEffect, useRef } from "react";

export default function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- 1. CONFIGURATION ---
    // These match the parameters from your original code
    const params = {
      cursorSize: 20, // Increased slightly for better visibility
      cursorPower: 40, // Increased power
      distortionPower: 0.4,
    };

    const pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      moved: false,
    };

    const res = { w: 0, h: 0 };
    let outputColor: any, velocity: any, divergence: any, pressure: any;
    let gl: WebGLRenderingContext;

    // --- 2. SHADER SOURCES ---
    // In React, we store shaders as strings instead of <script> tags

    const vertexShaderSource = `
      precision highp float;
      varying vec2 vUv;
      attribute vec2 a_position;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 u_texel;
      void main () {
          vUv = .5 * (a_position + 1.);
          vL = vUv - vec2(u_texel.x, 0.);
          vR = vUv + vec2(u_texel.x, 0.);
          vT = vUv + vec2(0., u_texel.y);
          vB = vUv - vec2(0., u_texel.y);
          gl_Position = vec4(a_position, 0., 1.);
      }
    `;

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D u_output_texture;
      void main () {
          vec3 c = texture2D(u_output_texture, vUv).rgb;
          gl_FragColor = vec4(c, 1.0);
      }
    `;

    const splatShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D u_input_texture;
      uniform float u_ratio;
      uniform vec3 u_point_value;
      uniform vec2 u_point;
      uniform float u_point_size;
      void main () {
          vec2 p = vUv - u_point.xy;
          p.x *= u_ratio;
          vec3 splat = exp(-dot(p, p) / u_point_size) * u_point_value;
          vec3 base = texture2D(u_input_texture, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.);
      }
    `;

    const advectionShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D u_velocity_texture;
      uniform sampler2D u_input_texture;
      uniform vec2 u_texel;
      uniform float u_dt;
      uniform float u_dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
          vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
          gl_FragColor = u_dissipation * bilerp(u_input_texture, coord, u_texel);
      }
    `;

    const divergenceShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_velocity_texture;
      void main () {
          float L = texture2D(u_velocity_texture, vL).x;
          float R = texture2D(u_velocity_texture, vR).x;
          float T = texture2D(u_velocity_texture, vT).y;
          float B = texture2D(u_velocity_texture, vB).y;
          float div = .5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0., 0., 1.);
      }
    `;

    const pressureShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_pressure_texture;
      uniform sampler2D u_divergence_texture;
      void main () {
          float L = texture2D(u_pressure_texture, vL).x;
          float R = texture2D(u_pressure_texture, vR).x;
          float T = texture2D(u_pressure_texture, vT).x;
          float B = texture2D(u_pressure_texture, vB).x;
          float C = texture2D(u_pressure_texture, vUv).x;
          float divergence = texture2D(u_divergence_texture, vUv).x;
          float pressure = (L + R + B + T - divergence) * .25;
          gl_FragColor = vec4(pressure, 0., 0., 1.);
      }
    `;

    const gradientSubtractShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D u_pressure_texture;
      uniform sampler2D u_velocity_texture;
      void main () {
          float L = texture2D(u_pressure_texture, vL).x;
          float R = texture2D(u_pressure_texture, vR).x;
          float T = texture2D(u_pressure_texture, vT).x;
          float B = texture2D(u_pressure_texture, vB).x;
          vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0., 1.);
      }
    `;

    // --- 3. WEBGL HELPERS ---

    function createShader(source: string, type: number) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    function createProgram(vertexShader: WebGLShader, fragmentSource: string) {
      const fragmentShader = createShader(fragmentSource, gl.FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!program || !fragmentShader) return null;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(program, i)?.name;
        if (name) uniforms[name] = gl.getUniformLocation(program, name);
      }

      return { program, uniforms };
    }

    function createFBO(w: number, h: number) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        w,
        h,
        0,
        gl.RGBA,
        gl.FLOAT,
        null
      );

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number) {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        read: () => fbo1,
        write: () => fbo2,
        swap: () => {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function blit(destination: any) {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      if (destination == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, destination.width, destination.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    // --- 4. INITIALIZATION ---

    try {
      gl = canvas.getContext("webgl") as WebGLRenderingContext;
      gl.getExtension("OES_texture_float");
    } catch (e) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER);
    if (!vertexShader) return;

    const splatProgram = createProgram(vertexShader, splatShaderSource);
    const divergenceProgram = createProgram(
      vertexShader,
      divergenceShaderSource
    );
    const pressureProgram = createProgram(vertexShader, pressureShaderSource);
    const gradientSubtractProgram = createProgram(
      vertexShader,
      gradientSubtractShaderSource
    );
    const advectionProgram = createProgram(vertexShader, advectionShaderSource);
    const displayProgram = createProgram(vertexShader, displayShaderSource);

    function resizeCanvas() {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      res.w = canvasRef.current.width;
      res.h = canvasRef.current.height;
    }

    function initFBOs() {
      // Create frame buffers
      outputColor = createDoubleFBO(res.w, res.h);
      velocity = createDoubleFBO(res.w, res.h);
      divergence = createFBO(res.w, res.h);
      pressure = createDoubleFBO(res.w, res.h);
    }

    resizeCanvas();
    initFBOs();

    // --- 5. RENDER LOOP ---

    let lastTime = Date.now();
    let animationId: number;

    function render() {
      const dt = (Date.now() - lastTime) / 1000;
      lastTime = Date.now();

      if (
        !splatProgram ||
        !divergenceProgram ||
        !pressureProgram ||
        !gradientSubtractProgram ||
        !advectionProgram ||
        !displayProgram
      )
        return;

      // 1. SPLAT (Add dye/velocity on mouse move)
      // Note: To make particles "run away", we add velocity AWAY from mouse?
      // Standard fluid sim adds velocity IN direction of movement.
      if (pointer.moved) {
        gl.useProgram(splatProgram.program);
        gl.uniform1i(
          splatProgram.uniforms.u_input_texture,
          velocity.read().attach(1)
        );
        gl.uniform1f(
          splatProgram.uniforms.u_ratio,
          canvas.width / canvas.height
        );
        gl.uniform2f(
          splatProgram.uniforms.u_point,
          pointer.x / canvas.width,
          1.0 - pointer.y / canvas.height
        );
        gl.uniform3f(
          splatProgram.uniforms.u_point_value,
          pointer.dx,
          -pointer.dy,
          1.0
        ); // 1.0 = Color
        gl.uniform1f(
          splatProgram.uniforms.u_point_size,
          params.cursorSize / 10000.0
        ); // Scale down

        blit(velocity.write());
        velocity.swap();

        gl.uniform1i(
          splatProgram.uniforms.u_input_texture,
          outputColor.read().attach(1)
        );
        gl.uniform3f(splatProgram.uniforms.u_point_value, 1.0, 0.0, 0.5); // Color of the ink
        blit(outputColor.write());
        outputColor.swap();

        pointer.moved = false;
      }

      // 2. DIVERGENCE
      gl.useProgram(divergenceProgram.program);
      gl.uniform2f(
        divergenceProgram.uniforms.u_texel,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        divergenceProgram.uniforms.u_velocity_texture,
        velocity.read().attach(1)
      );
      blit(divergence);

      // 3. PRESSURE
      gl.useProgram(pressureProgram.program);
      gl.uniform2f(
        pressureProgram.uniforms.u_texel,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        pressureProgram.uniforms.u_divergence_texture,
        divergence.attach(1)
      );
      for (let i = 0; i < 20; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.u_pressure_texture,
          pressure.read().attach(2)
        );
        blit(pressure.write());
        pressure.swap();
      }

      // 4. GRADIENT SUBTRACT
      gl.useProgram(gradientSubtractProgram.program);
      gl.uniform2f(
        gradientSubtractProgram.uniforms.u_texel,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.u_pressure_texture,
        pressure.read().attach(1)
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.u_velocity_texture,
        velocity.read().attach(2)
      );
      blit(velocity.write());
      velocity.swap();

      // 5. ADVECTION (Move velocity field)
      gl.useProgram(advectionProgram.program);
      gl.uniform2f(
        advectionProgram.uniforms.u_texel,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        advectionProgram.uniforms.u_velocity_texture,
        velocity.read().attach(1)
      );
      gl.uniform1i(
        advectionProgram.uniforms.u_input_texture,
        velocity.read().attach(1)
      );
      gl.uniform1f(advectionProgram.uniforms.u_dt, dt);
      gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.98); // Decay
      blit(velocity.write());
      velocity.swap();

      // 6. ADVECTION (Move color field)
      gl.useProgram(advectionProgram.program);
      gl.uniform2f(
        advectionProgram.uniforms.u_texel,
        outputColor.texelSizeX,
        outputColor.texelSizeY
      );
      gl.uniform1i(
        advectionProgram.uniforms.u_velocity_texture,
        velocity.read().attach(1)
      );
      gl.uniform1i(
        advectionProgram.uniforms.u_input_texture,
        outputColor.read().attach(2)
      );
      gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.97); // Decay
      blit(outputColor.write());
      outputColor.swap();

      // 7. DISPLAY
      gl.useProgram(displayProgram.program);
      gl.uniform1i(
        displayProgram.uniforms.u_output_texture,
        outputColor.read().attach(1)
      );
      blit(null);

      animationId = requestAnimationFrame(render);
    }

    // --- 6. EVENT LISTENERS ---

    const updatePointer = (e: MouseEvent | Touch) => {
      const x = e.clientX;
      const y = e.clientY;
      pointer.dx = (x - pointer.x) * 5.0; // Speed multiplier
      pointer.dy = (y - pointer.y) * 5.0;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };

    const handleMouseMove = (e: MouseEvent) => updatePointer(e);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updatePointer(e.targetTouches[0]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", resizeCanvas);

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-black z-0 pointer-events-auto"
    />
  );
}
