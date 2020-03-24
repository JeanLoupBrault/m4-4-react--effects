import React from 'react';
import styled from 'styled-components';

import cookieSrc from '../cookie.svg';
import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useDocumentTitle from '../hooks/use-document-title.hook';
import useKeydown from '../hooks/use-keydown.hook';

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
];

const calculateCookiesPerSecond = purchasedItems => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find(item => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = React.useState(1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  // const calculateCookiesPerTick = purchasedItems => {
  //   return Object.keys(purchasedItems).reduce((acc, itemId) => {
  //     const numOwned = purchasedItems[itemId];
  //     const item = items.find(item => item.id === itemId);
  //     const value = item.value;

  //     return acc + value * numOwned;
  //   }, 0);
  // };

  const incrementCookies = () => {
    setNumCookies(c => c + 1);
  };

  //React.useEffect(() => {
  useDocumentTitle({
    //document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    title: `${numCookies} cookies - Cookie Clicker Workshop`,
    //return () => {
    //  document.title = `Cookie Clicker Workshop`;
    fallbackTitle: `Cookie Clicker Workshop`,
  });
  console.log(useDocumentTitle);
  //}, [numCookies]);

  useInterval(() => {
    //const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useKeydown('Space', incrementCookies);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerSecond(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map(item => {
          return (

            <Item
              key={item.id}

              name={item.name}
              cost={item.cost}
              value={item.value}
              handleAttemptedPurchase={() => {
                if (numCookies < items.cost) {
                  alert('Cannot aford item');
                  return;
                }
                setNumCookies(numCookies - item.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1,
                });
              }}
            />
          );
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
