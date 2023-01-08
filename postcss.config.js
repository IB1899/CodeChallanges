
import autoprefixer from "autoprefixer";
import precss from "precss";
import cssnano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";
import fonts from "postcss-font-magician"

export default {
    plugins: [
        precss(),
        autoprefixer(),
        cssnano({ preset: "default" }),
        postcssPresetEnv({ stage: 1 }),
        fonts()
    ]
}