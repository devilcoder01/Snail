
const Header = () => {
  return (
    <header className="w-full  bg- pt-16">
      <div className="mx-auto flex flex-col  justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-5xl font-semibold text-gray-900">Snail</h1>
        </div>
        <p className="text-lg text-gray-600">A secure web-based wallet</p>
      </div>
    </header>
  );
};

export default Header;