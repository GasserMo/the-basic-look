// eslint-disable-next-line no-unused-vars
const Spinner = () => (
  <div className="h-6 w-6 flex space-x-2 justify-center items-center">
    <span className="sr-only">Loading...</span>
    <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
  </div>
);
export default Spinner;
