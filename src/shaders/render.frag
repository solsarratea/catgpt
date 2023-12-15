varying vec2 vUv;
uniform sampler2D uWebcamTexture;

void main() {
    vec3 color = texture2D(uWebcamTexture, vUv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
