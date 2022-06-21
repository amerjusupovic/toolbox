import './App.scss';
import { Input } from 'antd';

function App() {
  return (
    <div className="main">
      <div className="search-bar"><Input.Search className="search-input search-home-scale" placeholder="Enter a URL" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/></div>
    </div>
  );
}

export default App;
