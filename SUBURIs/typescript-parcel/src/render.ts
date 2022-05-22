export class Renderer {
  private renderTarget: HTMLElement

  constructor(renderTarget: HTMLElement) {
    this.renderTarget = renderTarget
  }

  render(text: string): void {
    this.renderTarget.textContent = text
  }
}
