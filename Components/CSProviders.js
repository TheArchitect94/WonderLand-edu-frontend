import store from "@Store/store";
import { Provider } from "react-redux";

const CSProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CSProviders;
