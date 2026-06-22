import { NOISE_GLSL } from '../shaders'

// ─── Intelligent Core: pulsing nucleus ────────────────────────────────────────

export const coreVertex = /* glsl */`
${NOISE_GLSL}
uniform float uTime;
uniform float uActivity;   // 0..1 — rises on scroll
varying vec3  vNormal;
varying float vDisplace;
varying vec3  vPos;

void main(){
  vNormal = normalize(normalMatrix * normal);
  float n  = snoise(position * 1.2 + uTime * 0.35) * (0.18 + uActivity * 0.22);
  n       += snoise(position * 2.6 - uTime * 0.2)  * 0.08;
  vDisplace = n;
  vPos = position;
  vec3 p = position + normal * n;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

export const coreFragment = /* glsl */`
uniform float uTime;
uniform float uActivity;
uniform vec3  uCyan;
uniform vec3  uBlue;
uniform vec3  uViolet;
varying vec3  vNormal;
varying float vDisplace;
varying vec3  vPos;

void main(){
  vec3 viewDir = normalize(cameraPosition - vPos);
  float fres = pow(1.0 - abs(dot(vNormal, viewDir)), 2.6);
  float pulse = sin(uTime * 2.0) * 0.5 + 0.5;

  vec3 col = mix(uBlue, uCyan, fres + vDisplace * 0.6);
  col = mix(col, uViolet, fres * pulse * 0.5);
  col += uCyan * uActivity * 0.4;

  float alpha = 0.82 + fres * 0.18;
  gl_FragColor = vec4(col, alpha);
}
`

// ─── Fresnel glow shell ────────────────────────────────────────────────────────

export const glowVertex = /* glsl */`
varying vec3 vNormal;
varying vec3 vPos;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const glowFragment = /* glsl */`
uniform vec3  uColor;
uniform float uIntensity;
varying vec3  vNormal;
varying vec3  vPos;
void main(){
  vec3 viewDir = normalize(cameraPosition - vPos);
  float fres = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);
  gl_FragColor = vec4(uColor, fres * uIntensity);
}
`

// ─── Automation stream: flowing data packets along a tube ──────────────────────

export const streamVertex = /* glsl */`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const streamFragment = /* glsl */`
uniform float uTime;
uniform float uSpeed;
uniform vec3  uColor;
uniform float uOpacity;
varying vec2  vUv;

void main(){
  // moving packets along the tube length (uv.x)
  float flow = fract(vUv.x * 3.0 - uTime * uSpeed);
  float packet = smoothstep(0.0, 0.15, flow) * smoothstep(0.45, 0.15, flow);
  // soft base trail
  float base = 0.12;
  float edge = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
  float a = (base + packet * 0.9) * edge * uOpacity;
  vec3 col = uColor + packet * 0.5;
  gl_FragColor = vec4(col, a);
}
`
