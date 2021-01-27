import Header from '../Header';
import Layout from '../Layout';
import Footer from '../Footer';

import layoutBG1 from '../../assets/layout/bg_layout_1.jpg';
import layoutBG2 from '../../assets/layout/bg_layout_2.jpg';

const App = () => {
  return (
    <>
      <Header
        title="This is the header title"
        descr="This is the header description!"
      />
      <Layout
        id="first-layout"
        urlBg={layoutBG1}
      />
      <Layout
        id="middle-layout"
        title="This is the layout title"
        descr="This is the layout description!"
        colorBg="#2193ed"
      />
      <Layout
        id="last-layout"
        title="This is another layout title"
        descr="This is another layout description!"
        urlBg={layoutBG2}
      />
      <Footer />
    </>
  );
};

export default App;
