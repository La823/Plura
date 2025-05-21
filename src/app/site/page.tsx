import Navbar from "./components/navbar";
import PricingPage from "./components/pricingcard";

export default function Home() {
  return (
    <>
      <Navbar />

  <section className="relative min-h-screen flex justify-center items-center flex-col overflow-hidden">
  {/* Background grid */}
 <div className="absolute inset-0 -z-10 
  bg-white 
  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
  dark:bg-black 
  dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] 
  bg-[size:6rem_4rem]" 
/>

  {/* Radial highlight */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />

  <p className="text-xl text-center font-bold text-white mt-20">
    Run your agency in one place
  </p>

  <h1
    className="inline-block text-bold text-9xl uppercase font-black !bg-clip-text text-transparent !bg-cover !bg-center m-5"
    style={{
      background: "linear-gradient(to top left, #30cfd0, #330867)",
    }}
  >
    Plura
  </h1>
</section>

<section className="flex flex-col justify-center items-center py-20">
  <h1 className="text-3xl font-semibold">Choose what plan works for you</h1>
  <p className="text-muted text-center max-w-md mt-2">
    Ipsum lorem meowmeow purr ipsum hiss hiss meow.
  </p>
  <PricingPage/>
</section>
</>
)
}
