import Header from './Header';
import Content from './Content';

import logo from './logo.svg';
import css from './App.module.css';

function App() {
    return (
        <div>
            <Header className={css.header}>
                <img src={logo} className={css.logo} alt="logo" />
            </Header>
            <Content className={css.content} />
        </div>
    );
}

export default App;
