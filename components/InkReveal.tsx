'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * L'encre qui révèle le logo vivant — un vrai liquide.
 *
 * Au repos, la page montre le mot-symbole noir (une image, sous ce canevas).
 * La main traverse un liquide : elle y pousse une encre noire qui continue de
 * couler, tourbillonne et s'enroule après le geste. À l'intérieur de l'encre,
 * les lettres prennent leurs matières — nuage, verre, ballon, perles — telles
 * que la vidéo du logo les anime. Le fond noir de la vidéo EST l'encre.
 *
 * Simulation de fluide incompressible (« stable fluids », Stam 1999), sur la
 * carte graphique, à résolution réduite :
 *   vitesse → tourbillons (vorticité) → divergence → pression (Jacobi)
 *   → vitesse sans divergence → transport de la vitesse et de l'encre.
 * L'encre est ensuite découpée avec un bord net, et la vidéo n'apparaît
 * qu'à l'intérieur.
 *
 * Sans WebGL 2 ni rendu en flottants, rien n'est dessiné : le mot reste
 * noir et statique, sans erreur.
 */

/** Résolution de la simulation de vitesse (côté court), puis de l'encre. */
const SIM_RES = 128
const DYE_RES = 512
const PRESSURE_ITERATIONS = 20
/** Combien la vitesse et l'encre s'effacent par seconde. */
const VELOCITY_DISSIPATION = 1.4
const DYE_DISSIPATION = 0.75
/** Pression conservée d'une image à l'autre : un liquide qui a de la mémoire. */
const PRESSURE_DECAY = 0.8
/** Force des tourbillons : c'est elle qui fait s'enrouler l'encre. */
const CURL = 12
/** Rayon d'une touche, en pixels CSS à 1440 px de large. */
const SPLAT_RADIUS_PX = 28
/** Le liquide suit la main à cette fraction de sa vitesse. */
const FOLLOW = 0.25
/** Encre versée par touche (le bord de l'encre est à 0,5). */
const INK_PER_SPLAT = 0.5
/** Après le dernier geste, la simulation tourne encore ce temps-là, puis s'arrête. */
const IDLE_STOP_MS = 7000

const VS = `#version 300 es
precision highp float;
in vec2 aPos;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 o;
`

const SPLAT_FS = `${HEAD}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  o = vec4(texture(uTarget, vUv).xyz + splat, 1.0);
}`

const ADVECT_FS = `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uSimTexel;
uniform float uDt;
uniform float uDissipation;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uSimTexel;
  o = texture(uSource, coord) / (1.0 + uDissipation * uDt);
}`

const DIVERGENCE_FS = `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`

const CURL_FS = `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`

const VORTICITY_FS = `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlStrength;
uniform float uDt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * C;
  force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * uDt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`

const PRESSURE_FS = `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`

const GRADIENT_FS = `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(v, 0.0, 1.0);
}`

const SCALE_FS = `${HEAD}
uniform sampler2D uTexture;
uniform float uValue;
void main() {
  o = uValue * texture(uTexture, vUv);
}`

const DISPLAY_FS = `${HEAD}
uniform sampler2D uDye;
uniform sampler2D uVideo;
uniform vec4 uRect;
uniform vec2 uRes;
uniform float uTime;
uniform float uHasVideo;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  float d = texture(uDye, vUv).r;
  if (d < 0.08) { o = vec4(0.0); return; }
  // Repère de l'écran (origine en haut) pour placer la vidéo.
  vec2 suv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 px = suv * uRes;
  float n = noise(px / 30.0 + uTime * 0.4) - 0.5;
  float m = smoothstep(0.42, 0.5, d + n * 0.06);
  if (m < 0.002) { o = vec4(0.0); return; }
  vec3 col = vec3(0.0);
  vec2 vuv = (suv - uRect.xy) / uRect.zw;
  if (uHasVideo > 0.5 && vuv.x >= 0.0 && vuv.x <= 1.0 && vuv.y >= 0.0 && vuv.y <= 1.0) {
    // Le noir de la vidéo n'est pas tout à fait noir : on l'écrase pour qu'il
    // se fonde dans l'encre, sans bord visible au cadre de la vidéo.
    col = max(texture(uVideo, vuv).rgb - 0.045, 0.0) * 1.05;
  }
  o = vec4(col * m, m);
}`

type GL = WebGL2RenderingContext

interface Program {
  program: WebGLProgram
  uniforms: Record<string, WebGLUniformLocation | null>
}

interface Target {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texel: [number, number]
}

interface DoubleTarget {
  read: Target
  write: Target
  swap: () => void
}

function compile(gl: GL, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function makeProgram(gl: GL, vs: WebGLShader, fsSource: string): Program | null {
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource)
  const program = gl.createProgram()
  if (!fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.bindAttribLocation(program, 0, 'aPos')
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  const uniforms: Program['uniforms'] = {}
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number
  for (let i = 0; i < count; i += 1) {
    const info = gl.getActiveUniform(program, i)
    if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name)
  }
  return { program, uniforms }
}

function makeTarget(gl: GL, w: number, h: number, internal: number, format: number, filter: number): Target | null {
  const texture = gl.createTexture()
  const fbo = gl.createFramebuffer()
  if (!texture || !fbo) return null
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
  gl.viewport(0, 0, w, h)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  if (!ok) return null
  return { texture, fbo, width: w, height: h, texel: [1 / w, 1 / h] }
}

function makeDouble(gl: GL, w: number, h: number, internal: number, format: number, filter: number): DoubleTarget | null {
  const a = makeTarget(gl, w, h, internal, format, filter)
  const b = makeTarget(gl, w, h, internal, format, filter)
  if (!a || !b) return null
  const pair: DoubleTarget = {
    read: a,
    write: b,
    swap() {
      const t = pair.read
      pair.read = pair.write
      pair.write = t
    },
  }
  return pair
}

function freeTarget(gl: GL, target: Target | null | undefined) {
  if (!target) return
  gl.deleteTexture(target.texture)
  gl.deleteFramebuffer(target.fbo)
}

/** Résolution d'une grille dont le côté court vaut `res`, au format de la scène. */
function gridSize(res: number, width: number, height: number) {
  const aspect = width / Math.max(1, height)
  return aspect >= 1
    ? { w: Math.round(res * aspect), h: res }
    : { w: res, h: Math.round(res / aspect) }
}

export function InkReveal({
  stageRef,
  markRef,
  videoSrc,
  onReady,
}: {
  stageRef: RefObject<HTMLElement | null>
  markRef: RefObject<HTMLElement | null>
  videoSrc: string
  onReady?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    const stage = stageRef.current
    const mark = markRef.current
    if (!canvas || !video || !stage || !mark) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false })
    if (!gl) return
    // Rendre dans des textures en flottants : indispensable à une vitesse signée.
    if (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float')) return
    gl.getExtension('OES_texture_float_linear')

    const vs = compile(gl, gl.VERTEX_SHADER, VS)
    if (!vs) return
    const programs = {
      splat: makeProgram(gl, vs, SPLAT_FS),
      advect: makeProgram(gl, vs, ADVECT_FS),
      divergence: makeProgram(gl, vs, DIVERGENCE_FS),
      curl: makeProgram(gl, vs, CURL_FS),
      vorticity: makeProgram(gl, vs, VORTICITY_FS),
      pressure: makeProgram(gl, vs, PRESSURE_FS),
      gradient: makeProgram(gl, vs, GRADIENT_FS),
      scale: makeProgram(gl, vs, SCALE_FS),
      display: makeProgram(gl, vs, DISPLAY_FS),
    }
    if (Object.values(programs).some((p) => !p)) return
    const P = programs as Record<keyof typeof programs, Program>

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    const videoTexture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, videoTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))

    let velocity: DoubleTarget | null = null
    let dye: DoubleTarget | null = null
    let pressure: DoubleTarget | null = null
    let divergence: Target | null = null
    let curl: Target | null = null

    const freeAll = () => {
      for (const pair of [velocity, dye, pressure]) {
        freeTarget(gl, pair?.read)
        freeTarget(gl, pair?.write)
      }
      freeTarget(gl, divergence)
      freeTarget(gl, curl)
    }

    let width = 1
    let height = 1
    let scale = 1
    let ready = false

    const allocate = () => {
      freeAll()
      const sim = gridSize(SIM_RES, width, height)
      const dyeSize = gridSize(DYE_RES, width, height)
      velocity = makeDouble(gl, sim.w, sim.h, gl.RG16F, gl.RG, gl.LINEAR)
      dye = makeDouble(gl, dyeSize.w, dyeSize.h, gl.R16F, gl.RED, gl.LINEAR)
      pressure = makeDouble(gl, sim.w, sim.h, gl.R16F, gl.RED, gl.NEAREST)
      divergence = makeTarget(gl, sim.w, sim.h, gl.R16F, gl.RED, gl.NEAREST)
      curl = makeTarget(gl, sim.w, sim.h, gl.R16F, gl.RED, gl.NEAREST)
      ready = !!(velocity && dye && pressure && divergence && curl)
    }

    // ── Passes ────────────────────────────────────────────────────────
    const use = (p: Program) => gl.useProgram(p.program)
    const bindTex = (unit: number, texture: WebGLTexture | null) => {
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      return unit
    }
    const blit = (target: Target | null) => {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
        gl.viewport(0, 0, target.width, target.height)
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    /**
     * Une touche de la main : pousse le liquide de (dx, dy) pixels et y verse
     * de l'encre. La vitesse injectée est exprimée en cases de la grille par
     * seconde, pour que le liquide suive la main à sa vitesse réelle.
     */
    const splat = (x: number, y: number, dx: number, dy: number, dt: number) => {
      if (!ready || !velocity || !dye) return
      const u = P.splat.uniforms
      use(P.splat)
      const radius = Math.pow((SPLAT_RADIUS_PX * scale) / height, 2)
      gl.uniform1f(u.uAspect, width / height)
      gl.uniform2f(u.uPoint, x / width, 1 - y / height)
      gl.uniform1f(u.uRadius, radius)

      const vx = ((dx / width) * velocity.read.width * FOLLOW) / dt
      const vy = ((-dy / height) * velocity.read.height * FOLLOW) / dt
      gl.uniform2f(u.uTexel, velocity.read.texel[0], velocity.read.texel[1])
      gl.uniform1i(u.uTarget, bindTex(0, velocity.read.texture))
      gl.uniform3f(u.uColor, vx, vy, 0)
      blit(velocity.write)
      velocity.swap()

      gl.uniform2f(u.uTexel, dye.read.texel[0], dye.read.texel[1])
      gl.uniform1i(u.uTarget, bindTex(0, dye.read.texture))
      gl.uniform3f(u.uColor, INK_PER_SPLAT, 0, 0)
      blit(dye.write)
      dye.swap()
    }

    const step = (dt: number) => {
      if (!ready || !velocity || !dye || !pressure || !divergence || !curl) return
      gl.disable(gl.BLEND)
      const texel = velocity.read.texel

      use(P.curl)
      gl.uniform2f(P.curl.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.curl.uniforms.uVelocity, bindTex(0, velocity.read.texture))
      blit(curl)

      use(P.vorticity)
      gl.uniform2f(P.vorticity.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.vorticity.uniforms.uVelocity, bindTex(0, velocity.read.texture))
      gl.uniform1i(P.vorticity.uniforms.uCurl, bindTex(1, curl.texture))
      gl.uniform1f(P.vorticity.uniforms.uCurlStrength, CURL)
      gl.uniform1f(P.vorticity.uniforms.uDt, dt)
      blit(velocity.write)
      velocity.swap()

      use(P.divergence)
      gl.uniform2f(P.divergence.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.divergence.uniforms.uVelocity, bindTex(0, velocity.read.texture))
      blit(divergence)

      use(P.scale)
      gl.uniform2f(P.scale.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.scale.uniforms.uTexture, bindTex(0, pressure.read.texture))
      gl.uniform1f(P.scale.uniforms.uValue, PRESSURE_DECAY)
      blit(pressure.write)
      pressure.swap()

      use(P.pressure)
      gl.uniform2f(P.pressure.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.pressure.uniforms.uDivergence, bindTex(1, divergence.texture))
      for (let i = 0; i < PRESSURE_ITERATIONS; i += 1) {
        gl.uniform1i(P.pressure.uniforms.uPressure, bindTex(0, pressure.read.texture))
        blit(pressure.write)
        pressure.swap()
      }

      use(P.gradient)
      gl.uniform2f(P.gradient.uniforms.uTexel, texel[0], texel[1])
      gl.uniform1i(P.gradient.uniforms.uPressure, bindTex(0, pressure.read.texture))
      gl.uniform1i(P.gradient.uniforms.uVelocity, bindTex(1, velocity.read.texture))
      blit(velocity.write)
      velocity.swap()

      use(P.advect)
      gl.uniform2f(P.advect.uniforms.uTexel, texel[0], texel[1])
      gl.uniform2f(P.advect.uniforms.uSimTexel, texel[0], texel[1])
      gl.uniform1f(P.advect.uniforms.uDt, dt)
      gl.uniform1i(P.advect.uniforms.uVelocity, bindTex(0, velocity.read.texture))
      gl.uniform1i(P.advect.uniforms.uSource, 0)
      gl.uniform1f(P.advect.uniforms.uDissipation, VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      gl.uniform2f(P.advect.uniforms.uTexel, dye.read.texel[0], dye.read.texel[1])
      gl.uniform1i(P.advect.uniforms.uVelocity, bindTex(0, velocity.read.texture))
      gl.uniform1i(P.advect.uniforms.uSource, bindTex(1, dye.read.texture))
      gl.uniform1f(P.advect.uniforms.uDissipation, DYE_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    // ── État ──────────────────────────────────────────────────────────
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    // `?ink=demo` : la main traverse le liquide en continu, pour vérifier le
    // rendu sans souris (capture automatique, revue).
    const demo = new URLSearchParams(window.location.search).get('ink') === 'demo'
    let raf = 0
    let last = performance.now()
    let start = last
    let lastInput = -Infinity
    let visible = true
    let videoReady = false
    let lastVideoTime = -1
    let pointer: { x: number; y: number } | null = null
    let pending: { x: number; y: number; dx: number; dy: number }[] = []
    let auto: { from: number; duration: number; loop: boolean } | null = demo
      ? { from: performance.now(), duration: 6000, loop: true }
      : null

    const wake = () => {
      if (!raf && visible) {
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }

    // La main dans le liquide : chaque déplacement pousse le fluide dans sa
    // direction et y verse de l'encre. Un grand geste est découpé en touches
    // rapprochées, pour un sillage continu plutôt qu'une suite de taches.
    const move = (x: number, y: number) => {
      if (!pointer) {
        pointer = { x, y }
        return
      }
      const dx = x - pointer.x
      const dy = y - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist < 0.5) return
      const steps = Math.max(1, Math.ceil(dist / (14 * scale)))
      for (let i = 1; i <= steps; i += 1) {
        pending.push({ x: pointer.x + (dx * i) / steps, y: pointer.y + (dy * i) / steps, dx: dx / steps, dy: dy / steps })
      }
      pointer = { x, y }
      lastInput = performance.now()
      wake()
    }

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < -40 || y < -40 || x > rect.width + 40 || y > rect.height + 40) {
        pointer = null
        return
      }
      move(x, y)
    }
    const onLeave = () => {
      pointer = null
    }

    // Un passage d'introduction : la main traverse le mot une fois, pour
    // montrer ce que fait la souris sans le dire. Sur écran tactile, sans
    // survol possible, elle erre lentement sur le mot.
    const autoPath = (p: number) => {
      const m = mark.getBoundingClientRect()
      const s = stage.getBoundingClientRect()
      return {
        x: m.left - s.left + m.width * (0.06 + 0.88 * p),
        y: m.top - s.top + m.height * (0.5 + 0.3 * Math.sin(p * Math.PI * 3)),
      }
    }

    const draw = (now: number) => {
      // Image en cours : un geste reçu pendant le calcul ne relance pas une
      // seconde boucle.
      raf = -1
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000))
      last = now

      if (auto) {
        const raw = (now - auto.from) / auto.duration
        if (!auto.loop && raw >= 1) {
          auto = null
          pointer = null
        } else if (raw >= 0) {
          const p = auto.loop ? 0.5 - 0.5 * Math.cos(raw * Math.PI) : 1 - Math.pow(1 - raw, 2)
          const { x, y } = autoPath(p)
          move(x, y)
        }
      }

      // Plus rien ne bouge depuis longtemps : l'encre a disparu, on s'arrête.
      if (!auto && now - lastInput > IDLE_STOP_MS) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        if (!video.paused) video.pause()
        raf = 0
        return
      }

      // Les touches d'une même image se partagent son temps : la vitesse
      // injectée reste celle de la main, quel que soit leur nombre.
      const share = dt / Math.max(1, pending.length)
      for (const s of pending) splat(s.x, s.y, s.dx, s.dy, share * pending.length)
      pending = []
      step(dt)

      // Affichage : l'encre découpée, la vidéo à l'intérieur.
      if (videoReady && video.readyState >= 2) {
        if (video.paused) void video.play().catch(() => {})
        if (video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime
          gl.activeTexture(gl.TEXTURE2)
          gl.bindTexture(gl.TEXTURE_2D, videoTexture)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
        }
      }
      if (dye) {
        const u = P.display.uniforms
        use(P.display)
        gl.uniform2f(u.uTexel, 1 / canvas.width, 1 / canvas.height)
        gl.uniform1i(u.uDye, bindTex(0, dye.read.texture))
        gl.uniform1i(u.uVideo, bindTex(2, videoTexture))
        gl.uniform1f(u.uHasVideo, videoReady ? 1 : 0)
        gl.uniform1f(u.uTime, reduced ? 0 : (now - start) / 1000)
        const s = stage.getBoundingClientRect()
        const m = mark.getBoundingClientRect()
        gl.uniform4f(u.uRect, (m.left - s.left) / width, (m.top - s.top) / height, m.width / width, m.height / height)
        gl.uniform2f(u.uRes, width, height)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      raf = visible ? requestAnimationFrame(draw) : 0
    }

    const resize = () => {
      const rect = stage.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      const changed = Math.round(w) !== Math.round(width) || Math.round(h) !== Math.round(height)
      width = w
      height = h
      scale = Math.min(1.25, Math.max(0.55, width / 1440))
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      if (changed || !ready) allocate()
      wake()
    }

    const onVideoReady = () => {
      if (videoReady) return
      videoReady = true
      onReady?.()
      start = performance.now()
      // Avec « réduire les animations », pas de passage spontané : l'encre ne
      // suit que la souris, qui est un geste de l'utilisateur.
      if (demo || reduced) return
      auto = coarse
        ? { from: performance.now(), duration: 7000, loop: true }
        : { from: performance.now() + 500, duration: 1800, loop: false }
      lastInput = performance.now()
      wake()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    observer.observe(mark)
    resize()
    if (demo) lastInput = performance.now()

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      if (visible) wake()
      else if (!video.paused) video.pause()
    })
    io.observe(stage)
    const onVisibility = () => {
      visible = !document.hidden
      if (visible) wake()
      else video.pause()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    video.addEventListener('loadeddata', onVideoReady)
    if (video.readyState >= 2) onVideoReady()
    else video.load()

    return () => {
      if (raf > 0) cancelAnimationFrame(raf)
      raf = 1
      observer.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      video.removeEventListener('loadeddata', onVideoReady)
      video.pause()
      freeAll()
    }
  }, [stageRef, markRef, onReady])

  return (
    <>
      <canvas ref={canvasRef} className='ink' aria-hidden />
      <video
        ref={videoRef}
        className='ink-source'
        src={videoSrc}
        muted
        loop
        playsInline
        preload='auto'
        aria-hidden
        tabIndex={-1}
      />
    </>
  )
}
