
// const steps = [
//   {
//     id: 1,
//     number: "01",
//     icon: "fa-solid fa-magnifying-glass",
//     title: "Explore Books",
//     description:
//       "Browse our collection and discover books from different categories.",
//   },
//   {
//     id: 2,
//     number: "02",
//     icon: "fa-solid fa-book-open",
//     title: "Borrow Your Book",
//     description:
//       "Choose your favorite book and borrow it from our library.",
//   },
//   {
//     id: 3,
//     number: "03",
//     icon: "fa-solid fa-book",
//     title: "Enjoy Reading",
//     description:
//       "Take your time, enjoy your reading journey and explore new ideas.",
//   },
//   {
//     id: 4,
//     number: "04",
//     icon: "fa-solid fa-rotate-left",
//     title: "Return the Book",
//     description:
//       "Return your borrowed book so another reader can enjoy it too.",
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <section className="bg-[#101714] px-4 py-20 text-white md:px-10 lg:px-20">
//       <div className="mx-auto max-w-7xl">
//         {/* Heading */}
//         <div className="mb-14 text-center">
//           <p className="mb-3 text-sm font-semibold uppercase tracking-[2px] text-[#f6e262]">
//             Simple & Easy
//           </p>

//           <h2 className="font-serif text-2xl font-bold md:text-3xl">
//             How Borrowing Works
//           </h2>

//           <p className="mx-auto mt-4 max-w-xl text-gray-400">
//             Your reading journey is just a few simple steps away.
//           </p>
//         </div>

//         {/* Steps */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {steps.map((step) => (
//             <div
//               key={step.id}
//               className="rounded-xl border border-white/10 bg-[#19231E] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-[#f6e262]/50"
//             >
//               <p className="mb-5 text-sm font-bold tracking-widest text-[#f6e262]">
//                 STEP {step.number}
//               </p>

//               <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6e262]/10 text-2xl text-[#f6e262]">
//                 <i className={step.icon}></i>
//               </div>

//               <h3 className="mb-3 text-lg font-bold">
//                 {step.title}
//               </h3>

//               <p className="text-sm leading-7 text-gray-400">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;
