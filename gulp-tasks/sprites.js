"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import svg from "gulp-svg-sprite";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import svgmin from "gulp-svgmin";
import replace from "gulp-replace";

gulp.task("sprites", () => {
  return gulp
    .src(paths.sprites.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svg({
        shape: {
          // dest: "intermediate-svg",
        },
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest(paths.sprites.dist))
    .pipe(
      debug({
        title: "Sprites",
      })
    )
    .on("end", browsersync.reload);
});
