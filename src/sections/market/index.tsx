interface Item {
  name: string;
  price: number;
}

const dummyData: Item[] = [
  { name: 'Apple', price: 1.2 },
  { name: 'Banana', price: 0.8 },
  { name: 'Cherry', price: 2.5 },
];

const Market = () => {
  return (
    <div>
      <h1>사과 나눔합니다</h1>
      <ul className="flex flex-wrap gap-24">
        {dummyData.map((item, index) => (
          <li key={index} className="rounded-lg border-1 p-4">
            <div>Name: {item.name}</div>
            <div>Price: ${item.price.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Market;
