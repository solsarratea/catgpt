precision highp float;

varying vec2 vUv;
uniform sampler2D uWebcamTexture;
uniform sampler2D uBackbuffer;
uniform float uTime;
uniform float uFrame;
uniform vec2 uResolution;

uniform float uRule[18];

uniform float uOffset[8];

uniform bool uShowcat;
uniform sampler2D uCat;

float luma(vec3 color) { return dot(color, vec3(0.299, 0.587, 0.114)); }

void main() {
  float pixelSize = 1.+floor(mix(0.,200.,uOffset[1]));
  vec2 pos =
    vec2(floor(vUv.x*uResolution.x / pixelSize) * pixelSize + pixelSize / 2.0,
         floor(vUv.y*uResolution.y / pixelSize) * pixelSize + pixelSize / 2.0);


  float neighbors = 0.0;

  for (float y = -1.0; y <= 1.0; y++) {
    for (float x = -1.0; x <= 1.0; x++) {
      vec4 pixelC = texture2D(uBackbuffer, (pos+ vec2(x * pixelSize, y * pixelSize)) / uResolution);
      neighbors += pixelC.r;

    }
  };


  vec3 color = texture2D(uBackbuffer, pos/uResolution).rgb;

  float status  =color.r; //status = previousState
  neighbors -= status;  // neighbors == total

  int ruleIndex = int(mix(neighbors, 8. + neighbors, 1.-status));
  float newState = float(uRule[ruleIndex]);


  vec3 webcamColor = texture2D(uWebcamTexture, pos / uResolution).rgb;
  vec3 cat = texture2D(uCat, pos / uResolution).rgb;
  vec3 bb = texture2D(uBackbuffer, pos / uResolution).rgb;

  webcamColor = mix(webcamColor,max(webcamColor,cat),float(uShowcat));

  vec3 source = mix(webcamColor,cat,float(uShowcat));
  vec3 wl = vec3(luma(source));

  float l = mix(0.,0.9,uOffset[0]);
  source = smoothstep(l,l+0.01,wl)-smoothstep(l+0.1,l+0.11,wl) ;

  vec3 render =vec3(newState);

  render = max(source,render);
  
  render.gb = max(render.gb,bb.rr*0.95);
  render = mix(source,render,step(20., uFrame));

  gl_FragColor = vec4(render,1.);

}
