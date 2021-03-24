import Header from '../../Components/Header';
import Layout from '../../Components/Layout';

import layoutBG1 from '../../Components/Layout/assets/bg_layout_1.jpg';

const HomePage = () => {
  return (
    <>
      <Header>
        <h1>Pokemon Game!</h1>
        <p>Actually, my first game on JS</p>
      </Header>

      <Layout id="home-about" urlBg={layoutBG1}>
        <h2>What is this game about?</h2>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.
        </p>
      </Layout>
    </>
  );
};

export default HomePage;
