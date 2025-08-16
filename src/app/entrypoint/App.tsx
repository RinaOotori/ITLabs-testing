import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from '../store/store.ts'
import {AppRouter} from "../router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
  </Provider>
  </StrictMode>,
)
