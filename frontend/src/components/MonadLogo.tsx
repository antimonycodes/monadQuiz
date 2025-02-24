import logo from "../assets/monadLogojpg-removebg-preview.png";

const MonadLogo = () => {
  return (
    <div className="relative w-60 h-60">
      <img src={logo} alt="Monad Logo" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">MONAD</div>
        <div className="text-white font-bold text-sm">Quiz</div>
      </div>
    </div>
  );
};

export default MonadLogo;
