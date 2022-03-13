import { Renderer } from "./render"

const app = document.getElementById("app")
const renderer = new Renderer(app)
renderer.render("This text is rendered by typescript")
