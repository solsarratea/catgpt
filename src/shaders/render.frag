varying vec2 vUv;
uniform sampler2D uChannel0;
uniform sampler2D uChannel1;
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


void main() {
  vec3 color;
  color = texture2D(uChannel0, vUv+vec2(0.001,0.)).rgb;
  color.g -= 0.2*texture2D(uChannel0, vUv+vec2(-0.005,0.)).b;
 

  // Input colour
  // vec3 newcolor = vec3(1.0, 0.8, 1.0);


  //  color.r = color.r * 0.3 + color.g * 0.7 + color.b * 0.1;

  //   vec3 power = (color.r+color.g+color.b)*0.3333-color;


 color = hueShift(color, mix(0.,3.,uOffset[3]));




  gl_FragColor = vec4(color, 1.0);
}
