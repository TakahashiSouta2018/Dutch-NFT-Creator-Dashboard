import React from 'react';

const TotalGasCard = () => {
  const gasData = [
    {
      name: 'ETH',
      value: 0.00003209,
    },
    {
      name: 'USD',
      value: 23.2,
    },
  ];
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <div className="font-normal text-sm text-black/50">Total Gas</div>
      <div className="flex flex-row justify-between">
        <div className="flex gap-8">
          {gasData.map((gas, index) => (
            <div key={index} className="flex gap-1 items-center">
              <p className="font-black md:font-black text-base w-[50px]">
                {gas.name}
              </p>
              <p className="text-base font-bold">{gas.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalGasCard;
