import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
        <div id="top_header">
            <section className="gif">
                <img src="пингвинчик.gif" alt="тут был пингвинчик"/>
            </section>

            <p className="top">Лабораторная работа №4, Bариант 2763</p>
            <p className="top">Выполнили: Полозова Екатерина, Кудлаков Роман (P3231)</p>
        </div>
      <App/>
    </Provider>
  </BrowserRouter>,
  rootElement
);
