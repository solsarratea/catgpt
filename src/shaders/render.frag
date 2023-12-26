varying vec2 vUv;
uniform sampler2D uChannel0;
uniform sampler2D uChannel1;
uniform vec2 uResolution;
uniform float uTime;
uniform float uOffset[8];


vec3 hueShift( vec3 color, float hueAdjust ){
  const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
  const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
  const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);
  const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
  const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
  const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);
  float   YPrime  = dot (color, kRGBToYPrime);
  float   I       = dot (color, kRGBToI);
  float   Q       = dot (color, kRGBToQ);
  float   hue     = atan (Q, I);
  float   chroma  = sqrt (I * I + Q * Q);
  hue += hueAdjust;
  Q = chroma * sin (hue);
  I = chroma * cos (hue);
  vec3    yIQ   = vec3 (YPrime, I, Q);
  return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

vec3 colorSaturate(vec3 cin, float amount ){
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(cin.rgb, W));
  return mix(intensity, cin.rgb, amount);
}

vec3 RGBsplit(vec2 clip, float delta){
  vec2 backCoord =clip;
  vec2 value = vec2(1.,0.) * delta;

  vec4 c1 = texture2D(uChannel0, backCoord - value )*step(value.x, backCoord.x)*step(value.y, backCoord.y);
  vec4 c2 = texture2D(uChannel0, backCoord);
  vec4 c3 =texture2D(uChannel0, backCoord + value )*step(value.x, 1.-backCoord.x)*step(value.y, 1.-backCoord.y);
  return vec3( c1.r, c2.g, c3.b);
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}


void main() {

  float pixelSize = 1.+floor(mix(0.,200.,uOffset[1]));
  vec2 pos =
    vec2(floor(vUv.x*uResolution.x / pixelSize) * pixelSize + pixelSize / 2.0,
         floor(vUv.y*uResolution.y / pixelSize) * pixelSize + pixelSize / 2.0);

  vec3 color;
  color = texture2D(uChannel0, vUv+vec2(0.001,0.)).rgb;
  color.g -= 0.2*texture2D(uChannel0, vUv+vec2(-0.005,0.)).b;
 

  // Input colour
  // vec3 newcolor = vec3(1.0, 0.8, 1.0);

  //  color.r = color.r * 0.3 + color.g * 0.7 + color.b * 0.1;
  //   vec3 power = (color.r+color.g+color.b)*0.3333-color;


  vec2 clip= fract(vUv+ uOffset[6]*vec2(0.,0.1*sin(10.*dot(vUv.x,vUv.y)+uTime*uOffset[7] )));
  vec3 colorOff = texture2D(uChannel0, clip).rgb;

  color =mix(color, colorOff,uOffset[6]);

  color = mix(color, RGBsplit(clip, uOffset[5]), uOffset[4]);

  color = hueShift(color, mix(0.,6.,uOffset[3]));

  color = colorSaturate(color, mix(0.,1.2,1.-uOffset[2]));


  gl_FragColor = vec4(color, 1.0);
}
