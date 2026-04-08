import { createStore } from "./core/store.js";
import { initialData } from "./data/mock-data.js";
import { createAppShell } from "./views/app-shell.js";

const store = createStore(initialData);
createAppShell(document.querySelector("#app"), store);
