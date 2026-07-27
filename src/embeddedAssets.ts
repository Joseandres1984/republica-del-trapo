import productAssets from "./embedded/products";
import mural from "./embedded/mural";
import logoA from "./embedded/logo-a";
import logoB from "./embedded/logo-b";

const embeddedImages: Record<string, string> = {
  ...productAssets,
  "/brand/mural-patria-barrio.webp": mural,
  "/brand/republica-del-trapo-logo-trimmed.png": logoA + logoB,
};

export default embeddedImages;
