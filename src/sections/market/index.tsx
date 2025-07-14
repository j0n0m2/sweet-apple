const dummyData = [
  { name: 'Apple', price: 1.2 },
  { name: 'Banana', price: 0.8 },
  { name: 'Cherry', price: 2.5 },
];

const Market = () => {
  return (
    <div>
      <h1>Market Page</h1>
      <ul className="flex flex-wrap gap-24">
        {dummyData.map((item, index) => (
          <li key={index} className="border-1 p-4">
            <div>Name: {item.name}</div>
            <div>Price: ${item.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Market;
