export function usedFunction(data: { name: string }): string {
  return `Hello, ${data.name}!`;
}

export function unusedExportedFunction(): void {
  console.log("This function is exported but never used.");
}

function unusedPrivateFunction(): void {
  console.log("This function is neither exported nor used.");
}
