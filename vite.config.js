import ViteGlsl from 'vite-plugin-glsl';

export default {
    // ... other config options
    plugins: [
        ViteGlsl(),
    ],
    build:{
        target: "esnext" // or "es2019",

    }
};
