export async function dynamicImport() {
  const module = await import("./indirectly-used");
  module.indirectlyUsedFunction();
}
