const fs = require("fs");
const imageFileNames = () => {
  const array = fs
    .readdirSync("src/assets/images")
    .filter((file) => {
      return file.endsWith(".png");
    })
    .map((file) => {
      return file.replace("@2x.png", "").replace("@3x.png", "");
    });

  return Array.from(new Set(array));
};
const svgFileNames = () => {
  const array = fs.readdirSync("src/assets/svgs").filter((file) => {
    return file.endsWith(".svg");
  });

  return Array.from(new Set(array));
};
// const iconFileNames = () => {
//   const array = fs
//     .readdirSync("src/assets/icons")
//     .filter((file) => {
//       return file.endsWith(".png");
//     })
//     .map((file) => {
//       return file.replace("@2x.png", "").replace("@3x.png", "");
//     });

//   return Array.from(new Set(array));
// };
const generate = () => {
  let svgProperties = svgFileNames()
    .map((name) => {
      return `${name.replace(
        ".svg",
        ""
      )}_svg: require('./svgs/${name}').default`;
    })
    .join(",\n  ");
  let imageProperties = imageFileNames()
    .map((name) => {
      return `${name.replace(
        ".png",
        ""
      )}_png: require('./images/${name}').default`;
    })
    .join(",\n  ");
  // let iconProperties = iconFileNames()
  //   .map((name) => {
  //     return `${name.replace(".png", "")}: require('./icons/${name}')`;
  //   })
  //   .join(",\n  ");
  const string = `const Assets = {
  ${svgProperties},
  ${imageProperties}
};
export default Assets;
`;
  fs.writeFileSync("src/assets/index.js", string, "utf8");
};
generate();
