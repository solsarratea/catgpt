precision highp float;

varying vec2 vUv;
uniform sampler2D uWebcamTexture;
uniform sampler2D uBackbuffer;
uniform float uTime;
uniform float uFrame;
uniform vec2 uResolution;

uniform float uRule[18];
uniform float uOffset1;
uniform float uOffset2;
uniform float uOffset3;


void main() {
  vec2 pixel = vUv;

  float pixelSize = 1.+floor(mix(0.,200.,uOffset2));
  vec2 pos =
    vec2(floor(gl_FragCoord.x / pixelSize) * pixelSize + pixelSize / 2.0,
         floor(gl_FragCoord.y / pixelSize) * pixelSize + pixelSize / 2.0);


  float threshold =(0.,1.,uOffset1);
  float neighbors = 0.0;

  for (float y = -1.0; y <= 1.0; y++) {
    for (float x = -1.0; x <= 1.0; x++) {
      vec4 pixelC = texture2D(uBackbuffer, (pos+ vec2(x * pixelSize, y * pixelSize)) / uResolution);
      neighbors += pixelC.r;


    }
  };


  vec3 color = texture2D(uBackbuffer, pos/uResolution).rgb;

  float status =color.r; //status = previousState
  neighbors -= status;  //neighbors == total




  int ruleIndex = int(mix(neighbors, 8. + neighbors, 1.-status));
  float newState = float(uRule[ruleIndex]);

  float l = threshold;
  vec3 webcamColor = texture2D(uWebcamTexture, pos / uResolution).rgb;
  vec3 bb = texture2D(uBackbuffer, pos / uResolution).rgb;
  vec3 ccc;
  //ccc+= step(0.,sin(2./length(pos/uResolution *2.-1.)*200.));
  ccc= max(ccc,smoothstep(l,l+0.01, webcamColor.rrr)-smoothstep(l+0.1,l+0.11, webcamColor.rrr));

  vec3 render =vec3(newState);

  render.gb = max(render.gb,bb.rr*0.9);

  render = mix(ccc,render,step(1., neighbors)*(1.-uOffset3));
  render = mix(ccc,render,step(50., uFrame));

  gl_FragColor = vec4(render,1.);

}
