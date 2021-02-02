import MenuNavbar from '../../Components/MenuNavbar';
import Header from '../../Components/Header';

const GamePage = ({ onChangePage }) => {
  return (
    <div>
      <MenuNavbar onChangePage={onChangePage} />
      <Header>
        <h1>This is future Game page!</h1>
      </Header>
    </div>
  );
};

GamePage.defaultProps = {
  onChangePage: () => {},
};

export default GamePage;
