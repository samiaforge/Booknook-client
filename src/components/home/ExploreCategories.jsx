const categories = [
  {
    id: 1,
    name: "Fiction",
    icon: "fa-solid fa-book-open",
    description: "Explore stories and imagination.",
  },
  {
    id: 2,
    name: "Science",
    icon: "fa-solid fa-flask",
    description: "Discover science and technology.",
  },
  {
    id: 3,
    name: "History",
    icon: "fa-solid fa-landmark",
    description: "Travel through the past.",
  },
  {
    id: 4,
    name: "Kids",
    icon: "fa-solid fa-child",
    description: "Fun stories for young readers.",
  },
  {
    id: 5,
    name: "Others",
    icon: "fa-solid fa-layer-group",
    description: "Explore more interesting books.",
  },
];

const ExploreCategories = () => {
  return (
    <section className="bg-[#0D1917] px-4 py-20 text-white md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[2px] text-[#f6e262]">
            Find Your Interest
          </p>

          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            Explore Categories
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Discover books from different categories and find something you love.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-white/10 bg-[#19231E] p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#f6e262]/50"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6e262]/10 text-2xl text-[#f6e262]">
                <i className={category.icon}></i>
              </div>

              <h3 className="mb-2 text-lg font-bold">
                {category.name}
              </h3>

              <p className="text-sm leading-6 text-gray-400">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreCategories;