import Image from "next/image"
const Header = () => {
  return (
    <header className="w-[390px] border border-b-black bg-white text-primary-500 p-4 pb-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button>
          <Image
            src="menu.svg"
            width="32"
            height="32"
            alt="menu"
          />
        </button>
        <p className="font-josefin-sans text-xl tracking-wide">
          MenoLearn
        </p>
      </div>
      <div>
        <button>
          <Image
            src="profile.svg"
            width="32"
            height="32"
            alt="profile"
          />
        </button>
      </div>
    </header>
  )
}

export default Header
