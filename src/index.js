import { StrictMode } from "react";
import ReactDOM from 'react-dom';
// import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/chester-king/ethernals-second",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
