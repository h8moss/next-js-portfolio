import { Root } from "mdast";
import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";

const ensureAltInImages = lintRule<Root, { lang: "en" | "es" }>(
  "custom-linter:ensure-alt-in-images",
  (tree, file, options) => {
    visit(tree, "image", (node) => {
      if (
        ["", "description here"].includes((node.alt as string).toLowerCase())
      ) {
        file.message(
          "Ensure alt prop in images. Missing alt prop in image, please add a description to the image",
          node
        );
      }
    });
  }
);

export default ensureAltInImages;
